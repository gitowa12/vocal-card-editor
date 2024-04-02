const DownloadPDFButton = () => {
  const handleDownloadPDF = async () => {
    const res = await fetch("../api/pdf.ts");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported-pdf.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownloadPDF}>Download PDF</button>;
};

export default DownloadPDFButton;
