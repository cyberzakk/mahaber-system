import jsPDF from "jspdf"

export function generateReceipt(member,amount,month){

const doc=new jsPDF()

doc.text("Mahaber Payment Receipt",20,20)

doc.text(`Member: ${member}`,20,40)
doc.text(`Amount: ${amount} Birr`,20,50)
doc.text(`Month: ${month}`,20,60)

doc.save("receipt.pdf")

}