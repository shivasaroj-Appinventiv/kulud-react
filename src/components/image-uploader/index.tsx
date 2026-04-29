import { useRef, useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { IconButton, Dialog, DialogContent, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "react-toastify";
import { toastService } from "@/utils/toast.service";

type Props = {
    value?: string | File | null;
    onChange: (file: File | null) => void;
    maxSizeKB?: number;
    acceptedTypes?: string[];
    renderPlaceholder?: React.ReactNode;
    disabled?: boolean;
    enableCrop?: boolean;
    aspectRatio?: number; // default 1
    cropShape?: "rect" | "round"; // default rect
};

export default function ImageUpload({
    value,
    onChange,
    maxSizeKB = 200,
    acceptedTypes = ["image/jpeg", "image/png"],
    renderPlaceholder,
    disabled = false,
    enableCrop = true, // ✅ default true
    aspectRatio = 1,       // ✅ default 1:1
    cropShape = "rect",    // ✅ default square
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [cropImage, setCropImage] = useState<string | null>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [originalFile, setOriginalFile] = useState<File | null>(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    useEffect(() => {
        if (typeof value === "string") {
            setPreview(value);
        }
    }, [value]);

    const openFile = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxSizeKB * 1024) {
            toastService.showToast(`Max file size is ${maxSizeKB}KB`,"error");
            return;
        }

        if (!acceptedTypes.includes(file.type)) {
            toast.error('Invalid file format')
            return;
        }

        setOriginalFile(file); // ✅ store full file (name + type)

        const url = URL.createObjectURL(file);

        if (enableCrop) {
            setCropImage(url);
            setOpenCrop(true);
        } else {
            setPreview(url);
            onChange(file);
        }

        e.target.value = "";
    };

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // ✅ Convert cropped area to file
    const getCroppedImg = async () => {
        if (!cropImage || !croppedAreaPixels || !originalFile) return;

        const image = new Image();
        image.src = cropImage;

        await new Promise((resolve) => (image.onload = resolve));

        const canvas = document.createElement("canvas");
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        const ctx = canvas.getContext("2d");

        ctx?.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise<File>((resolve) => {
            canvas.toBlob((blob: any) => {
                const file = new File([blob], originalFile.name, {
                    type: originalFile.type, // ✅ preserve type
                });
                resolve(file);
            }, originalFile.type);
        });
    };

    const handleCropSave = async () => {
        const file = await getCroppedImg();
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange(file);
        setOpenCrop(false);
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <div
                    className="relative w-28 h-28 rounded-full border flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={openFile}
                >
                    {preview ? (
                        <>
                            <img src={preview} className="w-full h-full object-cover" />

                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                                className="!absolute top-1 right-1 bg-white"
                            >
                                <DeleteIcon fontSize="small" className="text-red-600" />
                            </IconButton>
                        </>
                    ) : (
                        renderPlaceholder || <UploadIcon className="text-gray-400" />
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        hidden
                        accept={acceptedTypes.join(",")}
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            {/* ✅ Cropper Dialog */}
            <Dialog open={openCrop} onClose={() => setOpenCrop(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    <div className="relative w-full h-64">
                        {cropImage && (
                            <Cropper
                                image={cropImage}
                                crop={crop}
                                zoom={zoom}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                                aspect={aspectRatio}
                                cropShape={cropShape}
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={() => setOpenCrop(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleCropSave}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}