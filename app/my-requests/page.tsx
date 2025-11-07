"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Request {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: "Open Proposal" | "Responded";
  image: string;
  category: string;
  location: string;
  quote: number;
  professional: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  message: string;
  videos: string[];
}

export default function MyRequestsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedInitial = localStorage.getItem("userInitial");
    const storedEmail = localStorage.getItem("userEmail");

    if (!storedInitial || !storedEmail) {
      router.push(ROUTES.LOGIN);
    }
  }, [router]);

  const filters = ["All", "Open Proposal", "Responses", "Validation"];

  const requests: Request[] = [
    {
      id: "1",
      serviceName: "Gardening Service",
      date: "16 Aug 2025",
      time: "10:00 am",
      status: "Responded",
      image: "/image/service-image-1.png",
      category: "DIY Services",
      location: "Paris, 75001",
      quote: 499,
      professional: {
        name: "Bessie Cooper",
        avatar: "/icons/testimonilas-1.png",
        verified: true,
      },
      message:
        "Our skilled team will expertly assemble your furniture, ensuring every piece is put together with precision. We take pride in our attention to detail, so you can trust that your items will be ready for use in no time. Whether it's a complex wardrobe or a simple table, we handle it all with care and professionalism.",
      videos: [
        "/image/service-image-1.png",
        "/image/service-image-2.png",
        "/image/service-image-3.png",
      ],
    },
    {
      id: "2",
      serviceName: "Gardening Service",
      date: "16 Aug 2025",
      time: "10:00 am",
      status: "Open Proposal",
      image: "/image/service-image-1.png",
      category: "DIY Services",
      location: "Paris, 75001",
      quote: 620,
      professional: {
        name: "Bessie Cooper",
        avatar: "/icons/testimonilas-1.png",
        verified: true,
      },
      message:
        "Our skilled team will expertly assemble your furniture, ensuring every piece is put together with precision. We take pride in our attention to detail, so you can trust that your items will be ready for use in no time.",
      videos: [
        "/image/service-image-2.png",
        "/image/service-image-3.png",
        "/image/service-image-4.png",
      ],
    },
    {
      id: "3",
      serviceName: "Gardening Service",
      date: "16 Aug 2025",
      time: "10:00 am",
      status: "Open Proposal",
      image: "/image/service-image-1.png",
      category: "DIY Services",
      location: "Paris, 75001",
      quote: 620,
      professional: {
        name: "Bessie Cooper",
        avatar: "/icons/testimonilas-1.png",
        verified: true,
      },
      message:
        "Our skilled team will expertly assemble your furniture, ensuring every piece is put together with precision. We take pride in our attention to detail, so you can trust that your items will be ready for use in no time.",
      videos: [
        "/image/service-image-2.png",
        "/image/service-image-3.png",
        "/image/service-image-4.png",
      ],
    },
    {
      id: "4",
      serviceName: "Gardening Service",
      date: "16 Aug 2025",
      time: "10:00 am",
      status: "Open Proposal",
      image: "/image/service-image-1.png",
      category: "DIY Services",
      location: "Paris, 75001",
      quote: 620,
      professional: {
        name: "Bessie Cooper",
        avatar: "/icons/testimonilas-1.png",
        verified: true,
      },
      message:
        "Our skilled team will expertly assemble your furniture, ensuring every piece is put together with precision. We take pride in our attention to detail, so you can trust that your items will be ready for use in no time.",
      videos: [
        "/image/service-image-2.png",
        "/image/service-image-3.png",
        "/image/service-image-4.png",
      ],
    },
  ];

  const filteredRequests =
    activeFilter === "All"
      ? requests
      : requests.filter((req) => {
          if (activeFilter === "Open Proposal") return req.status === "Open Proposal";
          if (activeFilter === "Responses") return req.status === "Responded";
          return true;
        });

  const selectedRequestData = requests.find((req) => req.id === selectedRequest);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Header showNavigationLinks={true} />

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          py: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", lg: "row" },
            flex: 1,
          }}
        >
          {/* Left Sidebar - Request Management */}
          <Box
            sx={{
              width: { xs: "100%", lg: 400 },
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#2F6B8E",
                mb: 3,
                fontSize: { xs: "1.5rem", md: "1.75rem" },
              }}
            >
              Request Management
            </Typography>

            {/* Filter Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              {filters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    fontSize: "0.9rem",
                    bgcolor: activeFilter === filter ? "#2F6B8E" : "transparent",
                    color: activeFilter === filter ? "white" : "text.secondary",
                    borderColor: activeFilter === filter ? "#2F6B8E" : "grey.300",
                    "&:hover": {
                      bgcolor: activeFilter === filter ? "#25608A" : "grey.50",
                      borderColor: "#2F6B8E",
                    },
                  }}
                >
                  {filter}
                </Button>
              ))}
            </Box>

            {/* Request Cards List */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  onClick={() => setSelectedRequest(request.id)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor:
                      selectedRequest === request.id ? "#2F6B8E" : "grey.200",
                    bgcolor:
                      selectedRequest === request.id
                        ? "rgba(47, 107, 142, 0.05)"
                        : "white",
                    "&:hover": {
                      borderColor: "#2F6B8E",
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={request.image}
                        alt={request.serviceName}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body1"
                        fontWeight="600"
                        sx={{ mb: 0.5, color: "text.primary" }}
                      >
                        {request.serviceName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1 }}
                      >
                        {request.date} • {request.time}
                      </Typography>
                      <Chip
                        label={request.status === "Responded" ? "Responded" : request.status}
                        size="small"
                        sx={{
                          bgcolor:
                            request.status === "Responded"
                              ? "#F59E0B"
                              : "#10B981",
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              borderRadius: 3,
              p: 4,
              position: "relative",
              minHeight: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "100%", sm: 300 },
                  bgcolor: "grey.50",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.300",
                  overflow: "hidden",
                }}
              >
                <InputBase
                  placeholder="Search"
                  sx={{
                    flex: 1,
                    px: 2,
                    py: 1,
                    "& .MuiInputBase-input": {
                      color: "text.primary",
                      fontSize: "0.95rem",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "text.secondary",
                      opacity: 1,
                    },
                  }}
                />
                <IconButton
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            {selectedRequestData ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    p: { xs: 2, md: 3 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", md: 200 },
                        height: { xs: 160, md: 160 },
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={selectedRequestData.image}
                        alt={selectedRequestData.serviceName}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="h5" fontWeight="bold" sx={{ color: "text.primary" }}>
                            {selectedRequestData.serviceName}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            Exterior Cleaning
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontWeight: 500 }}
                          >
                            Quote Amount
                          </Typography>
                          <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main" }}>
                            €{selectedRequestData.quote}
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "none",
                              mt: 1.5,
                              borderRadius: 2,
                              px: 3,
                            }}
                          >
                            Negotiate
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, auto)" },
                          gap: 2,
                          bgcolor: "grey.50",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 18, color: "primary.main" }} />
                          <Typography variant="body2" fontWeight="500">
                            {selectedRequestData.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 18, color: "primary.main" }} />
                          <Typography variant="body2" fontWeight="500">
                            {selectedRequestData.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BuildIcon sx={{ fontSize: 18, color: "primary.main" }} />
                          <Typography variant="body2" fontWeight="500">
                            {selectedRequestData.category}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LocationOnIcon sx={{ fontSize: 18, color: "primary.main" }} />
                          <Typography variant="body2" fontWeight="500">
                            {selectedRequestData.location}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          alignItems: { xs: "flex-start", sm: "center" },
                          gap: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar src={selectedRequestData.professional.avatar} alt={selectedRequestData.professional.name} />
                          <Box>
                            <Typography variant="body1" fontWeight="600">
                              {selectedRequestData.professional.name}
                              {selectedRequestData.professional.verified && (
                                <VerifiedIcon sx={{ fontSize: 18, color: "#10B981", ml: 0.5 }} />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              About professional
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                          }}
                        >
                          View Profile
                        </Button>
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
                          Personalized short message
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {selectedRequestData.message}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
                          Short videos
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          {selectedRequestData.videos.map((video, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: { xs: "100%", sm: 180 },
                                height: 120,
                                borderRadius: 2,
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <Image src={video} alt={`Video ${index + 1}`} fill style={{ objectFit: "cover" }} />
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
                          Supporting documents
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          {[1, 2].map((doc) => (
                            <Card
                              key={doc}
                              sx={{
                                flex: "1 1 200px",
                                borderRadius: 2,
                                border: "1px dashed",
                                borderColor: "grey.300",
                                bgcolor: "grey.50",
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                boxShadow: "none",
                              }}
                            >
                              <Image src="/icons/vector.png" alt="Document" width={40} height={40} />
                              <Typography variant="body2" fontWeight="500">
                                View Document
                              </Typography>
                            </Card>
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                          }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                            bgcolor: "primary.main",
                            "&:hover": {
                              bgcolor: "primary.dark",
                            },
                          }}
                        >
                          Accept
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 200, sm: 260 },
                    height: { xs: 200, sm: 260 },
                    position: "relative",
                  }}
                >
                  <Image
                    src="/icons/vector.png"
                    alt="No request selected"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textAlign: "center", maxWidth: 400 }}
                >
                  No requests selected. Choose a request from the list to view details.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

