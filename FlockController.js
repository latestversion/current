function FlockController(boids,world)
{
    this.boids = boids
    this.world = world

    this.update = function(dt)
    {
        //console.log("updating flock")
        var boids = this.boids

        // Check for world limit constraints
        for (var i = 0; i < boids.length; i++)
        {
            var b = boids[i]
            if(b.position.x > this.world.width)
            {
                b.position.x -= this.world.width
            }

            if(b.position.x < 0)
            {
                b.position.x += this.world.width
            }

            if(b.position.y > this.world.height)
            {
                b.position.y -= this.world.height
            }

            if(b.position.y < 0)
            {
                b.position.y += this.world.height
            }
        }

        var NEIGHBOR_RADIUS = 200
        var WANTED_SEPARATION = 30

        // Separation
        for (var i = 0; i < boids.length; i++)
        {
            // Separation
            var separation = new v2d(0,0)

            // Cohesion
            var avgposition = new v2d(0,0)

            // Alignment
            var avgvelocity = new v2d(0,0)
            var numneighbors = 0

            var b = boids[i]

            for (var j = 0; j < boids.length; j++)
            {
                if (i != j)
                {
                    var d = b.position.distance(boids[j].position)

                    if (d < WANTED_SEPARATION)
                    {
                        vectorfrom = b.position.vectorFrom(boids[j].position)
                        vectorfrom.multiply(WANTED_SEPARATION-d)
                        //vectorfrom.normalize()
                        separation.vectoradd(vectorfrom)
                    }

                    if (d < NEIGHBOR_RADIUS)
                    {
                        numneighbors += 1
                        avgposition.vectoradd(boids[j].position)
                        avgvelocity.vectoradd(boids[j].velocity)
                    }
                }
            }

            if(0 != numneighbors)
            {
                avgposition.divide(numneighbors)
                var vectortoavgposition = b.position.vectorTo(avgposition)
                vectortoavgposition.multiply(2)
                b.acceleration.vectoradd(vectortoavgposition)

                avgvelocity.divide(numneighbors)
                avgvelocity.multiply(20)
                b.acceleration.vectoradd(avgvelocity)
            }

            if(false)
            {
                b.acceleration.vectoradd(separation)
                b.separation = separation
                b.avgvelocity = avgvelocity
                b.avgposition = vectortoavgposition
                b.NEIGHBOR_RADIUS = NEIGHBOR_RADIUS
                b.WANTED_SEPARATION = WANTED_SEPARATION
            }
        }

    }

    this.draw = function()
    {

    }

}
