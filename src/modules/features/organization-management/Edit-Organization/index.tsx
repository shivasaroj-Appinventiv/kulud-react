import { useParams } from "react-router-dom";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrganizationDetails, updateOrganizationDetails } from "../organization.slices";
import {
  FieldArray,
  FormikProvider,
  useFormik,
  type FormikValues,
} from "formik";
import { addUpdateOrganizationSchema } from "../../../../schemas";

const EditOrganization = () => {
  const { id } = useParams();
  const initialValue: FormikValues = { name: "", email: "" };
  const dispatch = useDispatch<AppDispatch>();

  const { details, status } = useAppSelector(
    (state) => state.organizationManagement,
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrganizationDetails(id));
    }
  }, [id]);
  const formik = useFormik({
    initialValues: {
      name: details?.name || "",
      email: details?.email || "",
      bio: details?.bio || "",
      apt: details?.apt || "",
      address: details?.address || "",
      city: details?.city || "",
      state: details?.state || "",
      zipcode: details?.zipcode || "",
      profilePicture: details?.profilePicture || "",
      website: {
        name: details?.website?.name || "",
        link: details?.website?.link || "",
      },
      socialLink: details?.socialLink || [{ name: "", link: "" }],
    },
    validationSchema: addUpdateOrganizationSchema,
    onSubmit: async (values) => {
      if (!id) return;

      const result = await dispatch(
        updateOrganizationDetails({payload: {organizationId: id, ...values} })
      );

      if (updateOrganizationDetails.fulfilled.match(result)) {
        // success — show toast or navigate
        console.log("Updated successfully",result);
      } else {
        // failed
        console.error("Update failed",result);
      }
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    formik;
  // ✅ Re-populate form once details are fetched
  useEffect(() => {
    if (details) {
      formik.resetForm({
        values: {
          name: details.name || "",
          email: details.email || "",
          bio: details.bio || "",
          apt: details.apt || "",
          address: details.address || "",
          city: details.city || "",
          state: details.state || "",
          zipcode: details.zipcode || "",
          profilePicture: details.profilePicture || "",
          website: {
            name: details.website?.name || "",
            link: details.website?.link || "",
          },
          socialLink: details.socialLink?.length
            ? details.socialLink
            : [{ name: "", link: "" }],
        },
      });
    }
  }, [details]);
  return (
    <>
      <FormikProvider value={formik}>
        <form
          onSubmit={handleSubmit}
          className=" mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Name */}
            <div>
              <label className="block font-medium mb-1">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Mylz Events"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              {touched.address && errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              {touched.city && errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block font-medium mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              {touched.state && errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            {/* Zipcode */}
            <div>
              <label className="block font-medium mb-1">Zipcode *</label>
              <input
                type="text"
                name="zipcode"
                value={values.zipcode}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              {touched.zipcode && errors.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              name="bio"
              rows={4}
              maxLength={500}
              value={values.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Website Name</label>
              <input
                type="text"
                name="website.name"
                value={values.website.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Website URL</label>
              <input
                type="text"
                name="website.link"
                value={values.website.link}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.website?.link && (
                <p className="text-red-500 text-sm">{errors.website.link}</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Social Links</h3>

            <FieldArray name="socialLink">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.socialLink.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex flex-col md:flex-row gap-3 items-start md:items-center"
                    >
                      <input
                        type="text"
                        name={`socialLink.${index}.name`}
                        value={item.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border rounded-lg px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name={`socialLink.${index}.link`}
                        value={item.link}
                        onChange={handleChange}
                        placeholder="Link"
                        className="border rounded-lg px-3 py-2 w-full"
                      />

                      {/* Add */}
                      {index === 0 && values.socialLink.length < 5 && (
                        <button
                          type="button"
                          onClick={() => push({ name: "", link: "" })}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Add
                        </button>
                      )}

                      {/* Remove */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default EditOrganization;
