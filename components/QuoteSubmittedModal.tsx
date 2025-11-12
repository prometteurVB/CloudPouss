"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface QuoteSubmittedModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuoteSubmittedModal({
  open,
  onClose,
}: QuoteSubmittedModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
        },
      }}
    >
      <DialogContent sx={{ position: "relative", textAlign: "center", py: 4 }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#9CA3AF",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Success Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 280,
              height: 280,
            }}
          >
            <Image
              src="/icons/quote-submitted.png"
              alt="Quote Submitted"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* Success Message */}
        <Typography
          variant="h6"
          sx={{
            color: "#6B7280",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Great job! Your service request submitted successfully.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
