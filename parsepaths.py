
import xml.etree.ElementTree as xmlparser
from pprint import pprint

X = 0
Y = 1


def parseDIntoAbsolutePositionVertices(d):
    # Check first letter in d
    # An 'm' means move-to rel + lineto rel until end.
    # m 443.38254,263.48531 9.96094,0 15.33203,61.62109 15.2832,-61.62109
    # And 'M' means move-to absolute + a list of {L x,y} (line-to absolute)
    # M 52.09375 3.6875 L 33.25 53 L 79.5625 46.40625 L 63.28125 3.6875 L 52.09375 3.6875 z

    vertices = []
    data = d.split(" ")
    firstchar = data[0]

    if firstchar == 'm':
        data = data[1:]
        pos = []
        pos.append(float(data[0].split(",")[X]))
        pos.append(float(data[0].split(",")[Y]))
        vertices.append([pos[X], pos[Y]])

        data = data[1:]

        for xy in data:
            temp = xy.split(",")
            pos[X] += float(temp[X])
            pos[Y] += float(temp[Y])

            vertices.append([pos[X], pos[Y]])

        vertices = vertices[:-1]

    elif firstchar == 'M':
        pos = []
        pos.append(float(data[1]))
        pos.append(float(data[2]))
        length = len(data)
        i = 0
        while i < length:
            letter = data[i * 3]
            if letter == 'z':
                break
            vertices.append([float(data[3 * i + 1]), float(data[3 * i + 2])])
            i += 1
    else:
        print("WHTF kind of character is " + firstchar)
        exit(99)

    return vertices


class Point:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y


class BBox:
    def __init__(self, minx=float("inf"), maxx=float("-inf"), miny=float("inf"), maxy=float("-inf")):
        self.width = 0
        self.height = 0
        self.pos = Point(0, 0)
        self.minx = minx
        self.miny = miny
        self.maxx = maxx
        self.maxy = maxy
        self.finalize()

    def finalize(self):
        self.width = self.maxx - self.minx
        self.height = self.maxy - self.miny
        self.pos = Point(self.minx, self.miny)

    def evalX(self, x):
        if x > self.maxx:
            self.maxx = x
        elif x < self.minx:
            self.minx = x

    def evalY(self, y):
        if y > self.maxy:
            self.maxy = y
        elif y < self.miny:
            self.miny = y

    def evalBox(self, box):
        self.evalX(box.minx)
        self.evalX(box.maxx)
        self.evalY(box.miny)
        self.evalY(box.maxy)


def getBoundingBoxFromPaths(paths):
    box = BBox()

    for path in paths:
        for coords in path:
            x = coords[X]
            y = coords[Y]

            box.evalX(x)
            box.evalY(y)

    box.finalize()
    return box


def relocateOriginForCoordsInPaths(neworigx, neworigy, paths):
    x = neworigx
    y = neworigy

    for path in paths:
        for coords in path:
            coords[X] = float("{0:.2f}".format(coords[X] - x))
            coords[Y] = float("{0:.2f}".format(coords[Y] - y))


class Symbol:
    def __init__(self, alfa, box, paths):
        self.width = float("{0:.5f}".format(box.width))
        self.height = float("{0:.5f}".format(box.height))
        self.paths = list(paths)
        self.stringId = alfa

    def __repr__(self):
        return "Symbol " + self.stringId + ": " + str(self.width) + " " + str(self.height) + " , " + str(
            len(self.paths)) + " paths"

    def __str__(self):
        return "Symbol " + self.stringId + ": " + str(self.width) + " " + str(self.height) + " , " + str(
            len(self.paths)) + " paths"


def pathToJscript(path):
    s = "["
    for coords in path:
        s += str(coords[0]) + "," + str(coords[Y]) + ","
    s = s[:-1]
    s += "]"
    return s


def pathsToJscript(paths):
    s = "["
    for path in paths:
        s += pathToJscript(path) + ","
    s = s[:-1]
    s += "]"
    return s


# The letters are alls upposed to be on one line, and B,D,O,P,Q,R letters divided
# into at least two paths so that they do not contain holes.
# (Make a copy of the letter in Inkscape and align to same position and then make
# two identical rectangles and overlap the letters with. Now select one letter one rect
# and make the intersection. Then select the remaining letter and then the full rectangle
# remainign and then make difference.
# The path ids should begin with the letter they represent.
filename = 'Monospaced-Bold.svg'

tree = xmlparser.parse(filename)
root = tree.getroot()

parsedletters = {}

# Get all path tags
for path in root.iter('{http://www.w3.org/2000/svg}path'):
    letter = path.attrib["id"][0]

    dinfo = path.attrib["d"]

    if not letter in parsedletters:
        parsedletters[letter] = [dinfo]
    else:
        parsedletters[letter].append(dinfo)

#print("I found " + str(len(parsedletters)))


globalBox = BBox()

letterpaths = {}

for letter in parsedletters:

    paths = []
    for info in parsedletters[letter]:
        vertices = parseDIntoAbsolutePositionVertices(info)
        paths.append(vertices)

    if len(paths) == 2:
        print(str(letter) + ": " + str(len(paths)))

    # Get bounding box for whole alphabet

    box = getBoundingBoxFromPaths(paths)

    globalBox.evalBox(box)

    letterpaths[letter] = paths

globalBox.finalize()

alphabet = {}

# Realign the origin for each individual letter,
# so that y coord is relative to a globally aligned y,
# and x origin is at minx per letter.
for letter,paths in letterpaths.items():

    box = getBoundingBoxFromPaths(paths)

    relocateOriginForCoordsInPaths(box.minx, globalBox.miny, paths)

    #print("Paths: " + str(len(paths)))

    sym = Symbol(letter, box, paths)
    #print("Paths: " + str(len(paths)))

    alphabet[letter] = sym

pprint(alphabet)

handle = open("alphabet.js", "w")

handle.write("var alphabet = {\n")
handle.write("rowheight:" + str(globalBox.height) + ",\n")
for letter in alphabet:
    sym = alphabet[letter]
    handle.write(letter + ":" + "new Symbol(" + "\"" + letter + "\"," + str(sym.width) + "," + str(
        sym.height) + "," + pathsToJscript(sym.paths) + ")")
    handle.write(",\n")
handle.write("\" \":new Symbol(\" \",36.9141,72.90039,[]),")
handle.write("};")
handle.close()
# for letter in alphabet:

