import jsPDF from "jspdf"

export function generateReport(members){

const doc=new jsPDF()

doc.text("Mahaber Financial Report",20,20)

let y=40

members.forEach(m=>{

doc.text(m.name,20,y)

y+=10

})

doc.save("mahaber-report.pdf")

}