import React from 'react';
import Sketch from 'react-p5';

let x = 0;
let y = 0;
let xStep = 10;
let yStep = 80;
let a = 0;
let a_ = 0;
let num = 0;
const width = 2000;
const height = 1200;

const P5Screen = () => {
    function setup(p5, canvasParentRef) {
        p5.createCanvas(width, height).parent(canvasParentRef);
        num = parseInt((width / xStep) * (height / yStep));
    }
    function draw(p5) {
        p5.background(15, 20, 30);
        p5.strokeWeight(xStep);
        p5.strokeCap(p5.SQUARE);
        let n = 0;
        while (n < num) {
            p5.stroke(
                255 - 255 * p5.cos(p5.radians(a)),
                255 * p5.cos(p5.radians(a)),
                255 - 255 * p5.sin(p5.radians(a)),
                255 - 255 * p5.sin(p5.radians(a))
            );
            p5.line(x, y, x, y + yStep);
            x += xStep;
            if (x > width) {
                x = xStep / 2;
                y += yStep;
            }
            if (y >= height) {
                y = 0;
                a = 0;
            }
            n++;
            a += a_;
        }
        a_ += 0.001;
    }
    return (
        <Sketch setup={setup} draw={draw}>
            P5Screen
        </Sketch>
    );
};

export default P5Screen;
