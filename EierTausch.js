class EierTausch{
    constructor(renderer,gameEngine,rows,cols){
        this.columns= cols;
        this.rows = rows;
        this.renderer = renderer;
        this.gameEngine = gameEngine;
    }


    prepare(){
        console.log("runs");

        this.renderer.drawGrid(this.rows,this.columns);
    }

    /**
     * Method that draws the eggs in their cells
     */
   renderGame(){
        for( let x=0; x<this.columns;x++){
            for(let y=0; y<this.rows;y++){
                let tile = this.gameEngine.getGrid(x,y);
                //@see GameEngine.js remove method some questionable life choices were made  
                this.renderer.drawEggInCell(x,y,tile.color==null ? "#FFFFFF":tile.color);
            }
        }
    }

    /**
     * Method to verify that the renderGame is called in a interval by swaping pieces
     */
   doShit(){
        let fromY =Math.floor(Math.random() * this.rows);
        let fromX = Math.floor(Math.random() * this.columns);
        let toY =Math.floor(Math.random() * this.rows);
        let toX = Math.floor(Math.random() * this.columns);
        this.gameEngine.swapPieces(fromX,fromY,toX,toY);
    }
}