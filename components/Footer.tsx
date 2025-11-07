"use client";

import React from "react";
import Image from "next/image";
import { Box, Container, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 0 },
          }}
        >
          {/* Left Side - Logo and Brand */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src="/icons/main-logo.png"
                alt="CoudPouss Logo"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
              CoudPouss
            </Typography>
          </Box>

          {/* Right Side - Navigation Links */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 4 },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Link
              href={ROUTES.HOME}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="body2" sx={{ "&:hover": { opacity: 0.8 } }}>
                Home
              </Typography>
            </Link>
            <Link
              href={ROUTES.SERVICES}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="body2" sx={{ "&:hover": { opacity: 0.8 } }}>
                Services
              </Typography>
            </Link>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            >
              Contact us
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            >
              Support
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            >
              FAQ
            </Typography>
          </Box>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.3)",
            mb: 4,
          }}
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 0 },
          }}
        >
          {/* Left Side - Copyright */}
          <Typography variant="body2" sx={{ color: "white" }}>
            © 2025 Copyright by CoudPouss
          </Typography>

          {/* Right Side - Social Media Icons */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {/* Facebook */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                border: "2px solid",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <FacebookIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>

            {/* Twitter */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                border: "2px solid",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <TwitterIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>

            {/* X (Twitter alternative) */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                border: "2px solid",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                X
              </Typography>
            </IconButton>

            {/* LinkedIn */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                border: "2px solid",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <LinkedInIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

