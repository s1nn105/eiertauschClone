class EierTausch{
    constructor(renderer){
        this.renderer = renderer;
    }


    prepare(){
        console.log("runs");

        this.renderer.drawGrid(9,9);
    }
}