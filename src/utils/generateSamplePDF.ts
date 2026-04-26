import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateSamplePDF = (order: any, mode: 'save' | 'view' = 'save') => {
  const doc = new jsPDF()
  const gold = [197, 160, 89] // #c5a059
  const slate = [15, 23, 42] // #0f172a

  // Helper functions
  const setGold = () => doc.setTextColor(gold[0], gold[1], gold[2])
  const setSlate = () => doc.setTextColor(slate[0], slate[1], slate[2])
  const setWhite = () => doc.setTextColor(255, 255, 255)

  // --- HEADER ---
  doc.setFillColor(slate[0], slate[1], slate[2])
  doc.rect(0, 0, 210, 45, 'F')
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  setGold()
  doc.text('SAMS', 20, 28)
  setWhite()
  doc.text('VALUATIONS', 52, 28)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('PROFESSIONAL REAL ESTATE VALUATIONS & FIDUCIARY SERVICES', 20, 36)
  
  doc.setFontSize(9)
  setGold()
  doc.text('ORDER ID:', 145, 20)
  setWhite()
  doc.text(order.id, 165, 20)
  setGold()
  doc.text('DATE:', 145, 26)
  setWhite()
  doc.text(new Date().toLocaleDateString(), 165, 26)

  // --- SUBJECT PROPERTY ---
  doc.setFontSize(13)
  setSlate()
  doc.setFont('helvetica', 'bold')
  doc.text('SUBJECT PROPERTY ANALYSIS', 20, 60)
  doc.setDrawColor(gold[0], gold[1], gold[2])
  doc.setLineWidth(0.8)
  doc.line(20, 63, 75, 63)

  const subjectData = [
    ['Property Address', order.address],
    ['Market Area', 'Springfield Metro / Rockdale County'],
    ['Property Type', 'Single Family Residential (SFR)'],
    ['Gross Living Area', '1,834 Sq Ft'],
    ['Lot Size', '0.28 Acres'],
    ['Year Built / Age', '2006 / 20 Years'],
    ['Condition', 'Superior - Well Maintained'],
    ['Basement', 'None (Slab on Grade)'],
  ]

  autoTable(doc, {
    startY: 70,
    margin: { left: 20 },
    theme: 'plain',
    body: subjectData,
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [100, 100, 100], cellWidth: 55 },
      1: { textColor: slate, fontStyle: 'bold' }
    }
  })

  // --- COMPARABLE SALES ---
  const finalY1 = (doc as any).lastAutoTable.finalY
  doc.setFontSize(13)
  setSlate()
  doc.setFont('helvetica', 'bold')
  doc.text('COMPARABLE SALES ANALYSIS', 20, finalY1 + 15)
  doc.line(20, finalY1 + 18, 75, finalY1 + 18)

  const compHeaders = [['COMPARABLE ADDRESS', 'PROXIMITY', 'SALE PRICE', 'DOM', 'ADJUSTED VALUE']]
  const compData = [
    ['242 Pleasant DR', '1.4 miles', '$177,000', '31', '$153,700'],
    ['456 Great LN', '0.6 miles', '$178,900', '21', '$155,500'],
    ['785 Meadow CT', '0.4 miles', '$150,000', '40', '$152,520'],
  ]

  autoTable(doc, {
    startY: finalY1 + 25,
    head: compHeaders,
    body: compData,
    headStyles: { fillColor: slate, textColor: gold, fontStyle: 'bold', fontSize: 9 },
    styles: { fontSize: 9, cellPadding: 4 },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      4: { fontStyle: 'bold', textColor: slate }
    }
  })

  const finalY2 = (doc as any).lastAutoTable.finalY

  // --- FINAL VALUATION BOX ---
  doc.setFillColor(slate[0], slate[1], slate[2])
  doc.rect(20, finalY2 + 10, 170, 35, 'F')
  doc.setDrawColor(gold[0], gold[1], gold[2])
  doc.setLineWidth(1)
  doc.rect(22, finalY2 + 12, 166, 31, 'D')
  doc.setFontSize(14)
  setGold()
  doc.setFont('helvetica', 'bold')
  doc.text('INDICATED MARKET VALUE', 30, finalY2 + 30)
  doc.setFontSize(26)
  setWhite()
  doc.text('$850,000', 125, finalY2 + 32)

  // --- FIDUCIARY STATEMENT ---
  const disclosureY = finalY2 + 60
  doc.setFontSize(9)
  setSlate()
  doc.setFont('helvetica', 'bold')
  doc.text('FIDUCIARY DISCLOSURE', 20, disclosureY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const statement = "This Broker Price Opinion (BPO) is prepared for internal valuation purposes only. This analysis is based on recent market activity and proprietary Sams Valuations data models. This is not an appraisal but a professional broker's estimate of market value for the intended use of the client."
  doc.text(doc.splitTextToSize(statement, 170), 20, disclosureY + 5)

  // --- SIGNATURE AREA (DYNAMICALLY PLACED) ---
  const sigY = Math.max(260, disclosureY + 30)
  
  // Check for page overflow
  if (sigY > 275) {
    doc.addPage()
    // Reset Y for new page
    doc.setDrawColor(200, 200, 200)
    doc.line(130, 40, 190, 40)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(14)
    doc.text('R. K. Smith', 140, 35)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('Authorized Signature', 145, 45)
    doc.text('Sams Valuations | Lic #01234567', 145, 49)
  } else {
    doc.setDrawColor(200, 200, 200)
    doc.line(130, sigY, 190, sigY)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(14)
    doc.text('R. K. Smith', 140, sigY - 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('Authorized Signature', 145, sigY + 5)
    doc.text('Sams Valuations | Lic #01234567', 145, sigY + 9)
  }

  // --- FOOTER ---
  doc.setFontSize(7)
  doc.setTextColor(150, 150, 150)
  doc.text('CONFIDENTIAL - FOR AUTHORIZED USE ONLY', 105, 290, { align: 'center' })
  
  if (mode === 'save') {
    doc.save(`${order.id}_Official_Report.pdf`)
  } else {
    window.open(doc.output('bloburl'), '_blank')
  }
}
