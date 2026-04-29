import Breadcrumb from "@/components/breadcrumb";
import useAddEditUserHelper from "./add-edit-user.helper";
import {
  Grid,
  Avatar,
  Box,
  Card,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import ImageUpload from "@/components/image-uploader";

// ── Country codes ──────────────────────────────────────────────
const countryCodes = [
  { code: "+974", flag: "🇶🇦", iso: "QA" },
  { code: "+91", flag: "🇮🇳", iso: "IN" },
  { code: "+1", flag: "🇺🇸", iso: "US" },
  { code: "+44", flag: "🇬🇧", iso: "GB" },
  { code: "+971", flag: "🇦🇪", iso: "AE" },
];

// ── Theme tokens ───────────────────────────────────────────────
const BRAND = "#155dfc";
const BRAND_HOVER = "#0a3ecf";
const BRAND_DISABLED = "#a3bffd";
const BRAND_LIGHT = "#eff4ff";

// ── Shared MUI sx helpers ──────────────────────────────────────
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontSize: "0.875rem",
    "& fieldset": { borderColor: "#D1D5DB" },
    "&:hover fieldset": { borderColor: BRAND },
    "&.Mui-focused fieldset": { borderColor: BRAND, borderWidth: "1.5px" },
    "&.Mui-error fieldset": { borderColor: "#EF4444" },
  },
  "& input::placeholder": { color: "#9CA3AF", fontSize: "0.875rem" },
  "& .MuiFormHelperText-root.Mui-error": { color: "#EF4444", marginLeft: 0 },
};

const selectSx = {
  borderRadius: "8px",
  backgroundColor: "#fff",
  fontSize: "0.875rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D1D5DB" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: BRAND },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: BRAND,
    borderWidth: "1.5px",
  },
};

// ── Label component ────────────────────────────────────────────
const FieldLabel = ({
  text,
  required,
}: {
  text: string;
  required?: boolean;
}) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: 500,
      mb: 0.75,
      fontSize: "0.8125rem",
      color: required ? BRAND : "#374151",
    }}
  >
    {text}
    {required && <span style={{ color: BRAND }}> *</span>}
  </Typography>
);

// ── Component ──────────────────────────────────────────────────
const AddEditUser = () => {
  const {
    breadcrumbs,
    formik,
    roles,
    branches,
    handleCancel,
    id,
    VITE_IMAGE_PREFIX,
    setImageFile,
  } = useAddEditUserHelper();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+974");

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024) {
      alert("File size must be under 200 KB");
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
    // formik.setFieldValue("profilePic", file);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex mb-4">
        <Breadcrumb breadCrumbs={breadcrumbs} />
      </div>

      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #F3F4F6",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          p: { xs: 3, md: 4 },
        }}
      >
        {/* ── Avatar upload ── */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}>
          <Box sx={{ position: "relative", width: 120, height: 120 }}>
            <ImageUpload
              value={
                typeof formik.values.profilePicture === "string" &&
                !!formik.values.profilePicture
                  ? encodeURI(
                      `${VITE_IMAGE_PREFIX}/${formik.values.profilePicture}`,
                    )
                  : formik.values.profilePicture
              }
              cropShape="round"
              aspectRatio={1}
              onChange={(file) => {
                console.log(file);
                
                setImageFile(file);
                formik.setFieldValue("profilePicture", file);
              }}
              enableCrop={true}
              renderPlaceholder={
                <div className="flex flex-col items-center text-gray-400 text-sm">
                  {/* <MdOutlineFileUpload /> */}
                  Upload
                </div>
              }
            />
          </Box>

          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.78rem", maxWidth: 280 }}
          >
            Maximum file size is 200 KB. Only JPG and PNG formats are allowed.
          </Typography>
        </Box>

        {/* ── Form ── */}
        <form onSubmit={formik.handleSubmit}>
          {/*
           * Single responsive row:
           * xs=12 → stacks on mobile
           * sm=6  → 2 columns on tablet
           * lg    → all 5 fields in one row on desktop (matching the screenshot)
           *
           * Field widths in the screenshot (approx):
           *  Full Name  → wider  ~2.5 units
           *  Role       → narrow ~1.5 units
           *  Phone      → wider  ~2.5 units  (includes country picker)
           *  Email      → wider  ~2.5 units
           *  Branch     → narrow ~1.5 units
           * Total = 10.5 → we use lg={2.4} each for equal, or custom below
           */}
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={12} sm={6} lg={2.5}>
              <FieldLabel text="Full Name" required />
              <TextField
                fullWidth
                size="small"
                name="fullName"
                placeholder="Enter Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && !!formik.errors.fullName}
                helperText={formik.touched.fullName && formik.errors.fullName}
                sx={textFieldSx}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12} sm={6} lg={1.5}>
              <FieldLabel text="Role" required />
              <Select
                fullWidth
                size="small"
                displayEmpty
                name="roleId"
                value={formik.values.roleId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.roleId && !!formik.errors.roleId}
                sx={selectSx}
              >
                <MenuItem value="">
                  <span style={{ color: "#9CA3AF" }}>Select Role</span>
                </MenuItem>
                {roles.map((role: any) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.roleId && formik.errors.roleId && (
                <FormHelperText
                  sx={{ color: "#EF4444", ml: 0, fontSize: "0.75rem" }}
                >
                  {formik.errors.roleId}
                </FormHelperText>
              )}
            </Grid>

            {/* Phone with country code picker */}
            <Grid item xs={12} sm={6} lg={3}>
              <FieldLabel text="Phone" />
              <Box sx={{ display: "flex" }}>
                {/* Country code Select */}
                <Select
                  size="small"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  renderValue={(val) => {
                    const found = countryCodes.find((c) => c.code === val);
                    return (
                      <span style={{ fontSize: "0.875rem" }}>
                        {found?.flag} {val}
                      </span>
                    );
                  }}
                  sx={{
                    minWidth: 108,
                    backgroundColor: "#fff",
                    fontSize: "0.875rem",
                    borderRadius: "8px 0 0 8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D1D5DB",
                      borderRightColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: BRAND,
                      borderRightColor: "transparent",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: BRAND,
                      borderWidth: "1.5px",
                      borderRightColor: "transparent",
                    },
                  }}
                >
                  {countryCodes.map((c) => (
                    <MenuItem key={c.iso} value={c.code}>
                      {c.flag} {c.code} ({c.iso})
                    </MenuItem>
                  ))}
                </Select>

                {/* Phone number input */}
                <TextField
                  fullWidth
                  size="small"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    ...textFieldSx,
                    "& .MuiOutlinedInput-root": {
                      ...textFieldSx["& .MuiOutlinedInput-root"],
                      borderRadius: "0 8px 8px 0",
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6} lg={2.5}>
              <FieldLabel text="Email" required />
              <TextField
                fullWidth
                size="small"
                name="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                sx={textFieldSx}
              />
            </Grid>

            {/* Branch */}
            <Grid item xs={12} sm={6} lg={1.5}>
              <FieldLabel text="Branch" />
              <Select
                fullWidth
                size="small"
                displayEmpty
                name="branchId"
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={selectSx}
              >
                <MenuItem value="">
                  <span style={{ color: "#9CA3AF" }}>Select Branch</span>
                </MenuItem>
                {branches.map((branch: any) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.nameEn}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* ── Action Buttons ── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              mt: 4,
            }}
          >
            {/* Cancel */}
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                width: 130,
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 500,
                borderColor: BRAND,
                color: BRAND,
                "&:hover": {
                  borderColor: BRAND_HOVER,
                  bgcolor: BRAND_LIGHT,
                },
              }}
            >
              Cancel
            </Button>

            {/* Add / Update */}
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || !formik.dirty}
              sx={{
                width: 130,
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 500,
                bgcolor: BRAND,
                boxShadow: "0 2px 8px rgba(21,93,252,0.35)",
                "&:hover": { bgcolor: BRAND_HOVER },
                "&.Mui-disabled": {
                  bgcolor: BRAND_DISABLED,
                  color: "#fff",
                },
              }}
            >
              {id ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default AddEditUser;
