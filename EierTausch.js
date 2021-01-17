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
        console.log("Runs renderGame");
        for( let x=0; x<this.columns;x++){
            for(let y=0; y<this.rows;y++){
                let tile = this.gameEngine.getGrid(x,y);
                this.renderer.drawEggInCell(x,y,tile.color);
            }
        }
    }
}