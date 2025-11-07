"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  LinearProgress,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface BookServiceModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: "Select Your Service Provider", progress: 15 },
  { id: 2, title: "Select A Category", progress: 20 },
  { id: 3, title: "Describe About Service", progress: 70 },
  { id: 4, title: "Valuation of Job", progress: 80 },
  { id: 5, title: "Preview", progress: 100 },
];

const categories = [
  { value: "diy", label: "DIY", icon: "🔧" },
  { value: "homecare", label: "Home Care", icon: "🏠" },
  { value: "transport", label: "Transport", icon: "🚚" },
  { value: "personal-care", label: "Personal Care", icon: "🛡️" },
];

const services = {
  diy: [
    { id: 1, name: "Furniture Assembly", image: "/image/service-image-1.png" },
    { id: 2, name: "Interior Painting", image: "/image/service-image-2.png" },
    { id: 3, name: "TV Installation", image: "/image/service-image-3.png" },
  ],
  homecare: [
    { id: 1, name: "House Cleaning", image: "/image/service-image-1.png" },
    { id: 2, name: "Kitchen Cleaning", image: "/image/service-image-2.png" },
  ],
  transport: [
    { id: 1, name: "Moving Help", image: "/image/service-image-1.png" },
    { id: 2, name: "Delivery Service", image: "/image/service-image-2.png" },
  ],
  "personal-care": [
    { id: 1, name: "Personal Care", image: "/image/service-image-1.png" },
  ],
};

export default function BookServiceModal({ open, onClose }: BookServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceProvider, setServiceProvider] = useState("professional");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [serviceDescription, setServiceDescription] = useState("");
  const [valuation, setValuation] = useState("449.00");
  const [selectedDate, setSelectedDate] = useState("16");
  const [selectedTime, setSelectedTime] = useState({ hour: "10", minute: "00", period: "AM" });
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate progress based on current step and total steps
  const getProgress = () => {
    if (serviceProvider === "non-professional") {
      const progressMap: { [key: number]: number } = {
        1: 15,
        2: 20,
        3: 70,
        4: 80,
        5: 85, // Barter Product Details
        6: 100, // Preview
      };
      return progressMap[currentStep] || 0;
    } else {
      const progressMap: { [key: number]: number } = {
        1: 15,
        2: 20,
        3: 70,
        4: 80,
        5: 100, // Preview
      };
      return progressMap[currentStep] || 0;
    }
  };

  const progress = getProgress();

  const handleNext = () => {
    const maxStep = serviceProvider === "non-professional" ? 6 : 5;
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setCurrentStep(1);
      setServiceProvider("professional");
      setSelectedCategory("");
      setSelectedService(null);
      setServiceDescription("");
      setValuation("449.00");
      setSelectedDate("16");
      setSelectedTime({ hour: "10", minute: "00", period: "AM" });
      setProductName("");
      setQuantity(1);
    }, 3000);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedService(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
              {steps[0].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              To get started, please select a category. This will ensure we match you with the
              most suitable professional for your requirements.
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                sx={{ gap: 2 }}
              >
                <Card
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: serviceProvider === "professional" ? "#2F6B8E" : "grey.300",
                    bgcolor: serviceProvider === "professional" ? "rgba(47, 107, 142, 0.05)" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#2F6B8E",
                    },
                  }}
                  onClick={() => setServiceProvider("professional")}
                >
                  <FormControlLabel
                    value="professional"
                    control={<Radio />}
                    label="Professional"
                    sx={{ m: 0, width: "100%" }}
                  />
                </Card>
                <Card
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: serviceProvider === "non-professional" ? "#2F6B8E" : "grey.300",
                    bgcolor: serviceProvider === "non-professional" ? "rgba(47, 107, 142, 0.05)" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#2F6B8E",
                    },
                  }}
                  onClick={() => setServiceProvider("non-professional")}
                >
                  <FormControlLabel
                    value="non-professional"
                    control={<Radio />}
                    label="Non-professional"
                    sx={{ m: 0, width: "100%" }}
                  />
                </Card>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
              {steps[1].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please pick a category to begin. This will help us connect you with the right
              professional for your needs.
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                displayEmpty
                sx={{ mb: 2 }}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedCategory && services[selectedCategory as keyof typeof services] && (
              <Box sx={{ mt: 3 }}>
                {services[selectedCategory as keyof typeof services].map((service) => (
                  <Card
                    key={service.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: "pointer",
                      border: selectedService === service.id ? "2px solid #2F6B8E" : "1px solid",
                      borderColor:
                        selectedService === service.id ? "#2F6B8E" : "grey.300",
                      "&:hover": {
                        borderColor: "#2F6B8E",
                      },
                    }}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Typography variant="body1" fontWeight="500" sx={{ flex: 1 }}>
                        {service.name}
                      </Typography>
                      <Radio checked={selectedService === service.id} />
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
              {steps[2].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Great job! You&apos;ve selected your service. Now, please describe what you need so the
              professional can understand your request better.
            </Typography>

            {selectedCategory && (
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select value={selectedCategory} disabled>
                    <MenuItem value={selectedCategory}>
                      {categories.find((c) => c.value === selectedCategory)?.icon}{" "}
                      {categories.find((c) => c.value === selectedCategory)?.label}
                    </MenuItem>
                  </Select>
                </FormControl>
                {selectedService && (
                  <Card
                    sx={{
                      p: 2,
                      mb: 2,
                      border: "1px solid",
                      borderColor: "#2F6B8E",
                      bgcolor: "rgba(47, 107, 142, 0.05)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={
                            services[selectedCategory as keyof typeof services].find(
                              (s) => s.id === selectedService
                            )?.image || "/image/service-image-1.png"
                          }
                          alt="Selected Service"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Typography variant="body1" fontWeight="500">
                        {
                          services[selectedCategory as keyof typeof services].find(
                            (s) => s.id === selectedService
                          )?.name
                        }
                      </Typography>
                    </Box>
                  </Card>
                )}
              </Box>
            )}

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter Service description"
              placeholder="Enter description here..."
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Upload Photos of a Job
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              {[1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "2px dashed",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#2F6B8E",
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 0.5 }}>
                    +
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    upload from device
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
              Please upload photos of the job so the worker can understand the task better. (You
              can also upload a video)
            </Typography>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
              {steps[3].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Great, you&apos;re almost done. Please add the job valuation.
            </Typography>

            <TextField
              fullWidth
              label="Enter Valuation"
              value={`€ ${valuation}`}
              onChange={(e) => {
                const value = e.target.value.replace("€ ", "").replace(",", "");
                setValuation(value);
              }}
              sx={{ mb: 3 }}
            />

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Choose Date
            </Typography>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <IconButton size="small">
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <Typography variant="body1" fontWeight="500">
                  April 2025
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 1,
                  textAlign: "center",
                }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <Typography key={day} variant="caption" color="text.secondary">
                    {day}
                  </Typography>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <Box
                    key={day}
                    onClick={() => setSelectedDate(day.toString())}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      bgcolor: selectedDate === day.toString() ? "#2F6B8E" : "transparent",
                      color: selectedDate === day.toString() ? "white" : "text.primary",
                      "&:hover": {
                        bgcolor: selectedDate === day.toString() ? "#2F6B8E" : "grey.100",
                      },
                    }}
                  >
                    <Typography variant="body2">{day}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
              Choose Time
            </Typography>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    const hour = parseInt(selectedTime.hour);
                    if (hour > 1) setSelectedTime({ ...selectedTime, hour: (hour - 1).toString() });
                  }}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: "center" }}>
                  {selectedTime.hour}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    const hour = parseInt(selectedTime.hour);
                    if (hour < 12) setSelectedTime({ ...selectedTime, hour: (hour + 1).toString() });
                  }}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h6">:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    const minute = parseInt(selectedTime.minute);
                    if (minute > 0)
                      setSelectedTime({
                        ...selectedTime,
                        minute: (minute - 10).toString().padStart(2, "0"),
                      });
                  }}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: "center" }}>
                  {selectedTime.minute}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    const minute = parseInt(selectedTime.minute);
                    if (minute < 50)
                      setSelectedTime({
                        ...selectedTime,
                        minute: (minute + 10).toString().padStart(2, "0"),
                      });
                  }}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 2 }}>
                <Button
                  size="small"
                  variant={selectedTime.period === "AM" ? "contained" : "outlined"}
                  onClick={() => setSelectedTime({ ...selectedTime, period: "AM" })}
                  sx={{ minWidth: 50 }}
                >
                  AM
                </Button>
                <Button
                  size="small"
                  variant={selectedTime.period === "PM" ? "contained" : "outlined"}
                  onClick={() => setSelectedTime({ ...selectedTime, period: "PM" })}
                  sx={{ minWidth: 50 }}
                >
                  PM
                </Button>
              </Box>
            </Box>
          </Box>
        );

      case 5:
        // Show Barter Product Details if non-professional
        if (serviceProvider === "non-professional") {
          return (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
                Barter Product Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add details of the product or thing you want to offer in exchange for the service.
              </Typography>

              <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                Add Product Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                Quantity
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  p: 1,
                  width: "fit-content",
                  mb: 3,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    width: 32,
                    height: 32,
                  }}
                >
                  <Typography variant="body1">-</Typography>
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: "center" }}>
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    width: 32,
                    height: 32,
                  }}
                >
                  <Typography variant="body1">+</Typography>
                </IconButton>
              </Box>

              <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                Upload Photos of Product
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {[1, 2].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "2px dashed",
                      borderColor: "grey.300",
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "#2F6B8E",
                      },
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 0.5 }}>
                      +
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      upload from device
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        }
        // For professional, show Preview at step 5
        return renderPreviewStep();
      case 6:
        // Preview step for non-professional (after Barter)
        return renderPreviewStep();
      default:
        return null;
    }
  };

  const renderPreviewStep = () => {
    return (
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
          Preview
        </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Well done! You&apos;ve completed all the steps. Please review the preview and edit any
              details if needed.
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              {categories.find((c) => c.value === selectedCategory)?.label} Service
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                borderRadius: 2,
                overflow: "hidden",
                mb: 3,
              }}
            >
              <Image
                src={
                  services[selectedCategory as keyof typeof services]?.find(
                    (s) => s.id === selectedService
                  )?.image || "/image/service-image-1.png"
                }
                alt="Service Preview"
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "rgba(255,255,255,0.9)",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" fontWeight="600">
                  {
                    services[selectedCategory as keyof typeof services]?.find(
                      (s) => s.id === selectedService
                    )?.name
                  }
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Job Details
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Card sx={{ p: 2, flex: 1, border: "1px solid", borderColor: "grey.200" }}>
                <Typography variant="caption" color="text.secondary">
                  Valuation
                </Typography>
                <Typography variant="h6" color="#2F6B8E" fontWeight="bold">
                  €{valuation}
                </Typography>
              </Card>
              <Card sx={{ p: 2, flex: 1, border: "1px solid", borderColor: "grey.200" }}>
                <Typography variant="caption" color="text.secondary">
                  Job Date
                </Typography>
                <Typography variant="h6" color="#2F6B8E" fontWeight="bold">
                  {selectedDate} Aug
                </Typography>
              </Card>
              <Card sx={{ p: 2, flex: 1, border: "1px solid", borderColor: "grey.200" }}>
                <Typography variant="caption" color="text.secondary">
                  Job Time
                </Typography>
                <Typography variant="h6" color="#2F6B8E" fontWeight="bold">
                  {selectedTime.hour}:{selectedTime.minute} {selectedTime.period}
                </Typography>
              </Card>
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Service description
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {serviceDescription || "Expert furniture assembly services..."}
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Job photos
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {[1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    bgcolor: "grey.200",
                    border: "1px solid",
                    borderColor: "grey.300",
                  }}
                />
              ))}
            </Box>

            {serviceProvider === "non-professional" && productName && (
              <>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, mt: 3 }}>
                  Barter Product Details
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Card sx={{ p: 2, flex: 1, border: "1px solid", borderColor: "grey.200" }}>
                    <Typography variant="caption" color="text.secondary">
                      Product Name
                    </Typography>
                    <Typography variant="body1" color="#2F6B8E" fontWeight="bold">
                      {productName}
                    </Typography>
                  </Card>
                  <Card sx={{ p: 2, flex: 1, border: "1px solid", borderColor: "grey.200" }}>
                    <Typography variant="caption" color="text.secondary">
                      Quantity
                    </Typography>
                    <Typography variant="body1" color="#2F6B8E" fontWeight="bold">
                      {quantity}
                    </Typography>
                  </Card>
                </Box>
              </>
            )}
          </Box>
    );
  };

  return (
    <>
      <Dialog
        open={open && !showSuccess}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogContent sx={{ p: 4, position: "relative" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2F6B8E" }}>
            Create a Service Request
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#2F6B8E",
                  },
                }}
              />
              <Typography variant="body2" sx={{ ml: 2, minWidth: 50, textAlign: "right", color: "#2F6B8E" }}>
                {progress}%
              </Typography>
            </Box>
          </Box>

          <Box sx={{ minHeight: 400, mb: 4 }}>{renderStepContent()}</Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  borderColor: "#2F6B8E",
                  color: "#2F6B8E",
                  textTransform: "none",
                  px: 4,
                }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: 1 }} />
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !serviceProvider) ||
                (currentStep === 2 && (!selectedCategory || !selectedService)) ||
                (currentStep === 3 && !serviceDescription) ||
                (currentStep === 5 && serviceProvider === "non-professional" && !productName)
              }
              sx={{
                bgcolor: "#2F6B8E",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  bgcolor: "#25608A",
                },
              }}
            >
              {currentStep === (serviceProvider === "non-professional" ? 6 : 5) ? "Submit" : "Next"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={showSuccess}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            textAlign: "center",
            p: 4,
          },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              py: 2,
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 200,
                position: "relative",
                mb: 2,
              }}
            >
              <Image
                src="/icons/thankyou.png"
                alt="Thank You"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Great job! Your request is now submitted successfully.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

