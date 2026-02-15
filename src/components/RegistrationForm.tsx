import { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { registrationApi } from "../api/registration";
import type { RegistrationData } from "../api/registration";
import type { AxiosProgressEvent } from "axios";
import {
  User,
  GraduationCap,
  Code,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Check,
  Sparkles,
} from "lucide-react";

interface FormData {
  fullName: string;
  registrationNumber: string;
  email: string;
  phone: string;
  collegeName: string;
  otherCollegeName?: string;
  yearOfStudy: string;
  branch: string;
  gender: string;
  isCodingClubAffiliate: boolean;
  affiliateId: string;
  codechefHandle: string;
  leetcodeHandle: string;
  codeforcesHandle: string;
  transactionId: string;
  paymentScreenshot: File | null;
  screenshotUrl?: string | null;
  confirmInfo: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  fullName: "",
  registrationNumber: "",
  email: "",
  phone: "",
  collegeName: "SRKR Engineering College",
  otherCollegeName: "",
  yearOfStudy: "",
  branch: "",
  gender: "",
  isCodingClubAffiliate: false,
  affiliateId: "",
  codechefHandle: "",
  leetcodeHandle: "",
  codeforcesHandle: "",
  transactionId: "",
  paymentScreenshot: null,
  screenshotUrl: null,
  confirmInfo: false,
};

const branches = [
  "CSE",
  "CSBS",
  "CSD",
  "CSIT",
  "IT",
  "AI_DS",
  "AI_ML",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "CHEM",
  "BIO",
  "OTHER",
];

const years = [
  { label: "3rd Year", value: "THIRD_YEAR" },
  { label: "4th Year", value: "FOURTH_YEAR" },
];

const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
  { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
];

const steps = [
  { icon: User, title: "Personal Info" },
  { icon: GraduationCap, title: "Academic" },
  { icon: Code, title: "CP Handles" },
  { icon: CreditCard, title: "Payment" },
  { icon: CheckCircle, title: "Confirm" },
];

const RegistrationForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'uploading'|'uploaded'|'failed'>('idle');
  const [uploadError, setUploadError] = useState<string>("");
  const uploadAbortRef = useRef<AbortController | null>(null);
  const [apiError, setApiError] = useState<string>("");

  const registrationMutation = useMutation({
    mutationFn: registrationApi.register,
    onSuccess: (data) => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      console.log("Registration successful:", data.registrationCode);
    },
    onError: (error: Error) => {
      setApiError(error.message);
      setIsSubmitting(false);
    },
  });

  const updateField = (
    field: keyof FormData,
    value: string | boolean | File | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0:
        if (!formData.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!formData.registrationNumber.trim()) {
          newErrors.registrationNumber = "Registration number is required";
        } else if (!/^[a-zA-Z0-9]{10}$/.test(formData.registrationNumber)) {
          newErrors.registrationNumber = "Must be 10 alphanumeric characters";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
          newErrors.phone = "Must be 10 digits";
        }
        if (formData.isCodingClubAffiliate && !formData.affiliateId.trim()) {
          newErrors.affiliateId = "Affiliate ID is required";
        }
        break;
      case 1:
        if (!formData.collegeName) newErrors.collegeName = "College name is required";
        if (formData.collegeName === "Other" && !formData.otherCollegeName?.trim()) {
          newErrors.otherCollegeName = "Please specify your college name";
        }
        if (!formData.yearOfStudy)
          newErrors.yearOfStudy = "Year of study is required";
        if (!formData.branch) newErrors.branch = "Branch is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        break;
      case 2:
        break;
      case 3:
        if (!formData.transactionId.trim()) {
          newErrors.transactionId = "Transaction ID is required";
        } else if (!/^[a-zA-Z0-9]{8,12}$/.test(formData.transactionId)) {
          newErrors.transactionId = "Must be 8-12 alphanumeric characters";
        }
        if (!formData.screenshotUrl) {
          newErrors.paymentScreenshot = "Payment screenshot is required";
        }
        break;
      case 4:
        if (!formData.confirmInfo) {
          newErrors.confirmInfo = "Please confirm your information is correct";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const compressToWebP = async (
    file: File,
    maxDim = 1024,
    quality = 0.7,
  ): Promise<Blob> => {
    const imgBitmap = await createImageBitmap(file);
    let { width, height } = imgBitmap;
    const scale = Math.min(1, maxDim / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) =>
      canvas.toBlob((blob) => resolve(blob as Blob), "image/webp", quality),
    );
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: "File size must be less than 5MB",
      }));
      return;
    }
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: "Only PNG/JPG files are allowed",
      }));
      return;
    }

    updateField("paymentScreenshot", file);
    setFileName(file.name);
    setUploadProgress(0);
    setUploadError("");

    try {
      setUploadStatus("uploading");
      // compress
      const compressed = await compressToWebP(file, 1024, 0.7);

      const signature = await registrationApi.getUploadSignature();

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", compressed, `${file.name.replace(/\.[^.]+$/,"")}.webp`);
      cloudinaryFormData.append("timestamp", signature.timestamp.toString());
      cloudinaryFormData.append("signature", signature.signature);
      cloudinaryFormData.append("api_key", signature.apiKey);
      cloudinaryFormData.append("folder", "iconcoderz-payments");

      // Abort control for cancel
      const controller = new AbortController();
      uploadAbortRef.current = controller;

      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
        cloudinaryFormData,
        {
          signal: controller.signal,
          onUploadProgress: (ev: AxiosProgressEvent) => {
            const loaded = ev?.loaded ?? 0;
            const total = ev?.total ?? compressed.size;
            const percent = Math.round((loaded / total) * 100);
            setUploadProgress(percent);
          },
        },
      );

      const secureUrl = (resp as any)?.data?.secure_url;
      if (!secureUrl) throw new Error("Upload failed");

      setUploadStatus("uploaded");
      setUploadProgress(100);
      setFileName(file.name);
      // store url in form for registration
      updateField("screenshotUrl", secureUrl);
    } catch (err: unknown) {
      if ((err as any)?.name === "CanceledError" || (err as any)?.message === "canceled") {
        setUploadError("Upload cancelled");
        setUploadStatus("idle");
      } else {
        setUploadError((err as Error).message || "Upload failed");
        setUploadStatus("failed");
      }
      setUploadProgress(0);
    } finally {
      uploadAbortRef.current = null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setApiError("");
    setUploadProgress(0);

    try {
      if (!formData.screenshotUrl || uploadStatus !== "uploaded") {
        throw new Error("Please upload payment screenshot before submitting");
      }

      const registrationData: RegistrationData = {
        fullName: formData.fullName,
        registrationNumber: formData.registrationNumber,
        email: formData.email,
        phone: formData.phone,
        collegeName:
          formData.collegeName === "Other"
            ? formData.otherCollegeName || "Other"
            : formData.collegeName,
        yearOfStudy: formData.yearOfStudy,
        branch: formData.branch,
        gender: formData.gender,
        isCodingClubAffiliate: formData.isCodingClubAffiliate,
        affiliateId: formData.isCodingClubAffiliate
          ? formData.affiliateId
          : undefined,
        codechefHandle: formData.codechefHandle || undefined,
        leetcodeHandle: formData.leetcodeHandle || undefined,
        codeforcesHandle: formData.codeforcesHandle || undefined,
        transactionId: formData.transactionId,
        screenshotUrl: formData.screenshotUrl as string,
      };

      await registrationMutation.mutateAsync(registrationData);
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      setApiError(message);
      setIsSubmitting(false);
    }
  };

  const registrationOpenDate = new Date("2026-01-25T00:00:00+05:30");
  const registrationCloseDate = new Date("2026-02-10T21:00:00+05:30");
  const now = new Date();
  const isRegistrationClosed = !import.meta.env.DEV && now > registrationCloseDate;
  const isRegistrationOpen =
    import.meta.env.DEV || (now >= registrationOpenDate && now <= registrationCloseDate);

  if (isRegistrationClosed) {
    return (
      <section id="register" className="section-padding" ref={ref}>
        <div className="registration-container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Registration</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Join <span className="gradient-text">Iconcoderz-2k26</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 sm:p-12 text-center mt-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-20 h-20 rounded-full bg-red-500/80 flex items-center justify-center mx-auto mb-6"
            >
              <AlertCircle className="text-white w-10 h-10" />
            </motion.div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Registrations Closed
            </h3>

            <p className="text-lg text-muted-foreground mb-6">
              Registrations closed on <span className="text-destructive font-semibold">10th February 2026, 9:00 PM (IST)</span>.
            </p>

            <div className="bg-muted rounded-xl p-4 inline-block">
              <p className="text-sm text-muted-foreground">
                For any queries, contact <span className="text-primary font-medium">+91 85002 16667</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (!isRegistrationOpen) {
    return (
      <section id="register" className="section-padding" ref={ref}>
        <div className="registration-container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Registration</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Join <span className="gradient-text">Iconcoderz-2k26</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 sm:p-12 text-center mt-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="text-white w-10 h-10" />
            </motion.div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Opens Soon!
            </h3>

            <p className="text-lg text-muted-foreground mb-6">
              Registrations will be opened on{" "}
              <span className="text-primary font-semibold">
                25th January 2026
              </span>
            </p>

            <div className="bg-muted rounded-xl p-4 inline-block">
              <p className="text-sm text-muted-foreground">
                Stay tuned for updates!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="register" className="section-padding">
        <div className="registration-container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass-card rounded-3xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6"
            >
              <Check className="text-white w-10 h-10" />
            </motion.div>
            <h2 className="font-heading text-3xl font-bold mb-4">
              Registration Successful! 🎉
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for registering for Iconcoderz-2k26. We'll verify your
              payment and send a confirmation email within 24 hours.
            </p>
            <div className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Your Registration ID
              </p>
              <p className="font-mono text-xl font-bold">
                IC2K26-
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              For any issues, contact{" "}
              <span className="text-primary font-medium">+91 85002 16667</span>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="section-padding " ref={ref}>
      <div className="registration-container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Registration</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Join <span className="gradient-text">Iconcoderz-2k26</span>
          </h2>
          <div className="mt-6 px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl inline-flex items-center gap-3 max-w-2xl mx-auto">
             <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
             <p className="text-sm text-yellow-200/80 text-left">
               Due to an overwhelming number of applications, registrations are currently closed for 1st and 2nd year students. We appreciate your enthusiasm!
             </p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    index <= currentStep
                      ? "gradient-bg text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 hidden sm:block ${
                    index <= currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-6 sm:p-8">
          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-400">
                  Uploading payment screenshot...
                </span>
                <span className="text-sm font-medium text-blue-400">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-400 font-medium">
                  Registration Failed
                </p>
                <p className="text-sm text-red-300/80 mt-1">{apiError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Registration Number */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        placeholder="10 alphanumeric"
                        value={formData.registrationNumber}
                        onChange={(e) =>
                          updateField(
                            "registrationNumber",
                            e.target.value
                              .replace(/[^a-zA-Z0-9]/g, "")
                              .slice(0, 10),
                          )
                        }
                      />
                      {errors.registrationNumber && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.registrationNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your.email@mail.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        placeholder="10-digit phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isCodingClubAffiliate"
                        className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary"
                        checked={formData.isCodingClubAffiliate}
                        onChange={(e) =>
                          updateField("isCodingClubAffiliate", e.target.checked)
                        }
                      />
                      <label
                        htmlFor="isCodingClubAffiliate"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Are you a Coding Club Affiliate?
                      </label>
                    </div>

                    {formData.isCodingClubAffiliate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium mb-2">
                          Affiliate ID *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                          placeholder="Enter your Affiliate ID"
                          value={formData.affiliateId}
                          onChange={(e) =>
                            updateField("affiliateId", e.target.value)
                          }
                        />
                        {errors.affiliateId && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />{" "}
                            {errors.affiliateId}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Academic Details */}
              {/* Step 2: Academic Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    Academic Details
                  </h3>

                  <div className="space-y-4">
                    {/* College Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        College Name *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        value={formData.collegeName}
                        onChange={(e) =>
                          updateField("collegeName", e.target.value)
                        }
                      >
                        <option value="SRKR Engineering College">
                          SRKR Engineering College
                        </option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.collegeName && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.collegeName}
                        </p>
                      )}
                    </div>

                    {formData.collegeName === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium mb-2">
                          Please specify College Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                          placeholder="Enter your college name"
                          value={formData.otherCollegeName}
                          onChange={(e) =>
                            updateField("otherCollegeName", e.target.value)
                          }
                        />
                        {errors.otherCollegeName && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />{" "}
                            {errors.otherCollegeName}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Year of Study *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        value={formData.yearOfStudy}
                        onChange={(e) =>
                          updateField("yearOfStudy", e.target.value)
                        }
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year.value} value={year.value}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                      {errors.yearOfStudy && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.yearOfStudy}
                        </p>
                      )}
                    </div>

                    {/* Branch */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Branch *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        value={formData.branch}
                        onChange={(e) => updateField("branch", e.target.value)}
                      >
                        <option value="">Select branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                      {errors.branch && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.branch}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Gender *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                        value={formData.gender}
                        onChange={(e) => updateField("gender", e.target.value)}
                      >
                        <option value="">Select gender</option>
                        {genders.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: CP Handles */}
              {/* Step 3: CP Handles */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="w-6 h-6 text-primary" />
                    Competitive Programming Handles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Optional but helps us recognize your skills
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="CodeChef"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                      value={formData.codechefHandle}
                      onChange={(e) =>
                        updateField("codechefHandle", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="LeetCode"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                      value={formData.leetcodeHandle}
                      onChange={(e) =>
                        updateField("leetcodeHandle", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Codeforces"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                      value={formData.codeforcesHandle}
                      onChange={(e) =>
                        updateField("codeforcesHandle", e.target.value)
                      }
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Payment */}
              {/* Step 4: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Payment Details
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: QR */}
                    <div className="bg-muted rounded-xl p-6 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Scan to Pay via UPI
                      </p>
                      <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center border-2 border-border overflow-hidden p-1">
                        <img
                          src={formData.isCodingClubAffiliate ? "/srkr-qr-affiliate.webp" : "/srkr-qr.webp"}
                          alt={formData.isCodingClubAffiliate ? "Affiliate Payment QR (₹50)" : "Payment QR Code (₹100)"}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Right: Transaction ID + Screenshot */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          12 Digits Transaction/UTR ID *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary transition-all"
                          value={formData.transactionId}
                          onChange={(e) =>
                            updateField(
                              "transactionId",
                              e.target.value.toUpperCase(),
                            )
                          }
                          placeholder="8-12 alphanumeric"
                        />
                        {errors.transactionId && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />{" "}
                            {errors.transactionId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Payment Screenshot *
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleFileChange}
                        />
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 py-4 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            {fileName ? (
                              <>
                                <Check className="text-green-500 w-6 h-6" />
                                <span className="text-sm text-muted-foreground">
                                  {fileName}
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload className="text-muted-foreground w-6 h-6" />
                                <span className="text-sm text-muted-foreground">
                                  Click to upload screenshot (PNG/JPG, max 5MB)
                                </span>
                              </>
                            )}
                          </button>

                          <div className="w-28">
                            {uploadStatus === "uploading" && (
                              <button
                                type="button"
                                className="w-full py-2 rounded-xl border border-border text-sm"
                                onClick={() => {
                                  uploadAbortRef.current?.abort();
                                }}
                              >
                                Cancel
                              </button>
                            )}

                            {uploadStatus === "failed" && (
                              <button
                                type="button"
                                className="w-full py-2 rounded-xl border border-danger text-sm text-danger"
                                onClick={() => {
                                  if (formData.paymentScreenshot) {
                                    const ev: any = { target: { files: [formData.paymentScreenshot] } };
                                    handleFileChange(ev as ChangeEvent<HTMLInputElement>);
                                  }
                                }}
                              >
                                Retry
                              </button>
                            )}

                            {uploadStatus === "uploaded" && (
                              <button
                                type="button"
                                className="w-full py-2 rounded-xl border border-muted text-sm"
                                onClick={() => {
                                  // remove uploaded image
                                  updateField("paymentScreenshot", null);
                                  updateField("screenshotUrl", null);
                                  setFileName("");
                                  setUploadStatus("idle");
                                  setUploadProgress(0);
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Small status / preview */}
                        <div className="mt-2">
                          {uploadStatus === "uploading" && (
                            <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                          )}

                          {uploadStatus === "uploaded" && formData.screenshotUrl && (
                            <div className="mt-2 flex items-center gap-3">
                              <img src={formData.screenshotUrl} alt="screenshot" className="w-20 h-20 rounded-md object-cover border" />
                              <span className="text-sm text-success">Uploaded</span>
                            </div>
                          )}

                          {uploadStatus === "failed" && (
                            <p className="text-sm text-destructive">Upload failed. {uploadError}</p>
                          )}
                        </div>

                        {errors.paymentScreenshot && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />{" "}
                            {errors.paymentScreenshot}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    Review & Confirm
                  </h3>

                  <div className="bg-muted rounded-xl p-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Full Name
                        </p>
                        <p className="font-medium">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Registration Number
                        </p>
                        <p className="font-medium">
                          {formData.registrationNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Year & Branch
                        </p>
                        <p className="font-medium">
                          {formData.yearOfStudy} - {formData.branch}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Transaction ID
                        </p>
                        <p className="font-medium font-mono">
                          {formData.transactionId}
                        </p>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmInfo}
                      onChange={(e) =>
                        updateField("confirmInfo", e.target.checked)
                      }
                      className=" w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      I confirm that all the information provided above is
                      correct and unique. I understand that providing incorrect
                      information may result in disqualification.
                    </span>
                  </label>
                  {errors.confirmInfo && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.confirmInfo}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground font-medium hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto flex items-center gap-2 btn-hero-primary"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto flex items-center gap-2 btn-hero-primary disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Registration
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
