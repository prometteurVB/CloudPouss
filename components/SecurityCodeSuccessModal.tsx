"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";

interface SecurityCodeSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function SecurityCodeSuccessModal({
  open,
  onClose,
  onProceed,
}: SecurityCodeSuccessModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            py: 2,
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              mb: 3,
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/icons/security-code-success.png"
              alt="Success"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Message */}
          <Typography
            variant="body1"
            fontWeight="600"
            sx={{
              color: "#1F2937",
              mb: 4,
              lineHeight: 1.6,
              px: 2,
            }}
          >
            Security Code validated successfully.
          </Typography>

          {/* Proceed Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={onProceed}
            sx={{
              bgcolor: "#2F6B8E",
              color: "white",
              textTransform: "none",
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#25608A",
              },
            }}
          >
            Proceed
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
