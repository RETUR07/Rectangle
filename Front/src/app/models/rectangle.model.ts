export class Rectangle {
    public rectX1: number = 0;
    public rectY1: number = 0;
    public rectY2: number = 0;
    public rectX2: number = 0;

    getX():number
    {
      return Math.min(this.rectX1, this.rectX2);
    }
  
    getY():number
    {
      return Math.min(this.rectY1, this.rectY2);
    }
  
    getWidth():number
    {
      return Math.abs(this.rectX1 - this.rectX2);
    }
  
    getHeight():number
    {
      return Math.abs(this.rectY1 - this.rectY2);
    }
  
    getPerimeter():number
    {
      return 2 * (this.getHeight() + this.getWidth());
    }
}