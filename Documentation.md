[EierTausch.js](Eiertausch.js)
ist eine art Kompositions klasse die alle anderen Sachen in sich hat.
Am besten wäre es wenn die klasse im Konstruktor alle benötigten objekte erzeugen würde allerdings weiß ich nicht wie das geht
Da JS anscheinend toll mit IMPORTS umgeht.
Die methode `renderGame` rendert das game und wird in einem Interval aufgerufen was momentan gut ist aber später sobald es animation gibt problemeatish werden könnte

[renderer.js](Renderer.js)
soll eig die ganze Malarbeit machen

[GameEngine.js](GameEngine.js)
hier soll die eigentlich magie passieren. Gamelogik, die map alles.
Die map sollte ausgelagert werden weil sie momentan net so toll funktioniert. Und des für bessere modellierung etc sorgen würde.
allerdings würde das mit dem problem das in eiertaush.js beshrieben wird (js imports) einher gehen. 
