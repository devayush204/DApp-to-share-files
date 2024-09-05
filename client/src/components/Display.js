import React, { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Typography, Card, CardContent, CardHeader,
  CircularProgress, IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FileCopy, PictureAsPdf, Videocam, Image as ImageIcon, Visibility } from "@mui/icons-material";
import { MD5 } from "crypto-js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down('sm')}`]: {
    fontSize: '0.8rem',
  },
}));

const FileIcon = ({ type }) => {
  switch (type) {
    case 'pdf':
      return <PictureAsPdf color="error" />;
    case 'video':
      return <Videocam color="primary" />;
    case 'image':
      return <ImageIcon color="success" />;
    default:
      return <PictureAsPdf color="action" />;
  }
};

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Hash copied to clipboard!");
  };

  const generateHash = (index) => {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 7);
    const data = timestamp + randomString + index.toString();
    const originalHash = MD5(data).toString().substring(0, 10);
    let updatedSalt = originalHash;
    for (let i = 0; i < 10; i++) {
      const randomDigits = Math.random().toString().substring(2, 7);
      updatedSalt += MD5(timestamp + randomDigits).toString().substring(0, 10);
    }
    return updatedSalt;
  };

  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'unknown';
  };

  const getdata = async (addressToUse) => {
    setLoading(true);
    let dataArray;
    const Otheraddress = addressToUse || account;

    try {
      dataArray = await contract.display(Otheraddress);
    } catch (e) {
      alert("You don't have access");
      setLoading(false);
      return;
    }

    if (dataArray.length === 0) {
      alert("No files to display");
      setLoading(false);
      return;
    }

    const files = dataArray.map((item, i) => {
      const updatedSalt = generateHash(i);
      const fileName = item.split("/").pop();
      const hashValue = `${fileName}${updatedSalt}`;
      const fileType = getFileType(item);

      return { url: item, hashValue, fileType };
    });

    setData(files);
    setLoading(false);
  };

  useEffect(() => {
    getdata(account);  // Fetch data initially using the account prop
  }, [account]);

  useEffect(() => {
    if (address) {
      getdata(address);
    }
  }, [address]);

  const handleViewFile = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Card sx={{ maxWidth: 1000, margin: 'auto', mt: 4 }}>
      <CardHeader title="File Display Dashboard" />
      <CardContent>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <TextField
            label="Enter account Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <Button 
            variant="contained" 
            onClick={() => getdata(address)} 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Loading..." : "Get Data"}
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="file display table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Preview</StyledTableCell>
                <StyledTableCell style={{ maxWidth: "350px" }}>Hash Value</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((file, i) => (
                <TableRow key={i}>
                  <StyledTableCell>
                    <FileIcon type={file.fileType} />
                  </StyledTableCell>
                  <StyledTableCell>
                    {file.url.includes("image") && (
                      <img src={file.url} alt={`File ${i}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    )}
                    {file.url.includes("video") && (
                      <video src={file.url} loop style={{ width: '50px', height: '50px', objectFit: 'cover' }} controls />
                    )}
                    {(!file.url.includes("video") && !file.url.includes("image")) && (
                      <PictureAsPdf style={{ width: '50px', height: '50px', color: '#f44336' }} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: "350px" }}>
                    <Typography style={{ maxWidth: "350px", overflow: "hidden" }} variant="body2">
                      {file.hashValue}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() => copyToClipboard(file.hashValue)}
                      size="small"
                      color="primary"
                    >
                      <FileCopy />
                    </IconButton>
                    <IconButton
                      onClick={() => handleViewFile(file.url)}
                      size="small"
                      color="secondary"
                    >
                      <Visibility />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Display;