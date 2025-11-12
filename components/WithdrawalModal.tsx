"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
  availableBalance: string;
}

export default function WithdrawalModal({
  open,
  onClose,
  availableBalance,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("€1,500");
  const [transferTo, setTransferTo] = useState("Savings Account");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRequestWithdrawal = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    onClose();
    // Reset form
    setAmount("€1,500");
    setTransferTo("Savings Account");
  }, [onClose]);

  // Auto-close success modal after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        handleCloseSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, handleCloseSuccess]);

  return (
    <>
      {/* Withdrawal Request Modal */}
      <Dialog
        open={open && !showSuccess}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ position: "relative" }}>
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: -16,
                top: -16,
                color: "#6B7280",
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Available Balance */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", mb: 1, fontSize: "0.875rem" }}
              >
                Available Balance
              </Typography>
              <Typography
                variant="h3"
                fontWeight="700"
                sx={{ color: "#1F2937" }}
              >
                {availableBalance}
              </Typography>
            </Box>

            {/* Funds Transfer */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "#374151", mb: 1, fontWeight: "500" }}
              >
                Funds Transfer
              </Typography>
              <TextField
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Transfer to */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "#374151", mb: 1, fontWeight: "500" }}
              >
                Transfer to
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="Savings Account">Savings Account</MenuItem>
                  <MenuItem value="Current Account">Current Account</MenuItem>
                  <MenuItem value="Business Account">Business Account</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Request Withdrawal Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleRequestWithdrawal}
              sx={{
                bgcolor: "#2F6B8E",
                color: "white",
                textTransform: "none",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#1e4a5f",
                },
              }}
            >
              Request Withdrawal
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={showSuccess}
        onClose={handleCloseSuccess}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 3,
          },
        }}
      >
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            {/* Success Illustration */}
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 280,
                  height: 280,
                  position: "relative",
                }}
              >
                <Image
                  src="/icons/thankyou.png"
                  alt="Thank you"
                  width={280}
                  height={280}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>

            {/* Success Message */}
            <Typography
              variant="h6"
              sx={{ color: "#6B7280", fontWeight: "500" }}
            >
              Withdrawal completed successfully!
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
