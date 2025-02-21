import { useEffect, useState } from 'react';

export default function useDownloadFile(paymentData) {

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [downloadLink, setDownloadLink] = useState();

  useEffect(() => {
    if (paymentData?.downloadLink) {
      setDownloadLink(paymentData.downloadLink);
    }
  }, [paymentData]);

  const downloadFile = async () => {
    try {
      if (!downloadLink) {
        throw new Error('No download link found');
      }

      setIsDownloading(true);

      // Navigate to the link directly, allowing the browser to handle the download
      window.location.href = downloadLink;
    } catch (error) {
      setDownloadError(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadFile, isDownloading, downloadError, downloadLink, setDownloadLink };
}
