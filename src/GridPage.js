import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const TableFormExample = () => {
  const [formData, setFormData] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [remidateModal, setRemidateModal] = useState(false);
  const [auditModal, setAuditModal] = useState(false);
  const [remediateMessage, setRemediateMessage] = useState("");
  const [auditMessage, setAuditMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
    fetch("http://20.235.244.160:9781/cis/hostconfig/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["results"]) {
          setFormData(data["results"]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderTableHeaders = () => {
    if (formData.length === 0) {
      return null; // Return null or some default content when formData is empty
    }
    const headers = formData.length && Object.keys(formData[0]);
    return (
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header} style={{ fontWeight: "bold" }}>
              {header}
            </TableCell>
          ))}
          <TableCell style={{ fontWeight: "bold" }}>Remediate</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Audit</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderTableRows = () => {
    return (
      <TableBody>
        {formData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <TableCell key={columnIndex}>{value}</TableCell>
            ))}

            <TableCell>
              <Button
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  handleScanCheck(row.id, 1);
                }}
              >
                Audit
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  handleScanCheck(row.id, 2);
                }}
              >
                Remediate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const handleScanCheck = async (hostID, operation) => {
    try {
      if (operation === 1) {
        setAuditModal(true);
        setRemidateModal(false);
      } else {
        setRemidateModal(true);
        setAuditModal(false);
      }
      const response = await fetch(
        "http://20.235.244.160:9781/cis/hostconfig/operation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            host_id: hostID,
            operation: operation,
          }),
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        if (operation === 1) {
          setAuditMessage(responseData["message"]);
        } else {
          setRemediateMessage(responseData["message"]);
        }
      } else {
        console.error("Audit API call failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during Audit API call:", error);
    }
  };

  const handleRemediateModalClose = () => {
    setRemidateModal(false);
  };

  const handleAuditModalClose = () => {
    setAuditModal(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {renderTableHeaders()}
          {renderTableRows()}
        </Table>
      </TableContainer>

      {/* Remediate Modal */}
      <Dialog open={remidateModal} onClose={handleRemediateModalClose}>
        <DialogTitle>Remediate Modal</DialogTitle>
        <DialogContent>
          <p>{remediateMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemediateModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Audit Modal */}
      <Dialog open={auditModal} onClose={handleAuditModalClose}>
        <DialogTitle>Audit Modal</DialogTitle>
        <DialogContent>
          <p>{auditMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAuditModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableFormExample;
