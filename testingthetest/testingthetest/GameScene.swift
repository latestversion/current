//
//  GameScene.swift
//  testingthetest
//
//  Created by Niklas Björnberg on 2015-12-20.
//  Copyright (c) 2015 Niklas Björnberg. All rights reserved.
//

import SpriteKit

class GameScene: SKScene {
    var label:SKLabelNode = SKLabelNode(fontNamed: "Chalkduster")
    override func didMoveToView(view: SKView) {
        /* Setup your scene here */
        let myLabel = SKLabelNode(fontNamed:"Chalkduster")
        myLabel.text = "Hello, World!";
        myLabel.fontSize = 15;
        myLabel.position = CGPoint(x:CGRectGetMidX(self.frame), y:CGRectGetMidY(self.frame));
        self.label = myLabel
        
        self.addChild(myLabel)
        label.text = "width: \(self.size.width) height: \(self.size.height)"
        
        //self.size = CGSizeMake(view.frame.width, view.frame.height)
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
       /* Called when a touch begins */
        
        for touch in touches {
            let location = touch.locationInNode(self)
            
            label.text = "\(location.y)"
            
            if (location.y < (self.size.height)/3)
            {
                label.text = label.text! + "< one third"
            }
            else if (location.y < 2/3*(self.size.height))
            {
                label.text = label.text! + "< two thirds"
            }
            else
            {
                label.text = label.text! + "< full"
            }
            
            /*let sprite = SKSpriteNode(imageNamed:"Spaceship")
            
            sprite.xScale = 0.5
            sprite.yScale = 0.5
            sprite.position = location
            
            let action = SKAction.rotateByAngle(CGFloat(M_PI), duration:1)
            
            sprite.runAction(SKAction.repeatActionForever(action))
            
            self.addChild(sprite)*/
        }
    }
   
    override func update(currentTime: CFTimeInterval) {
        /* Called before each frame is rendered */
    }
}
