"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface ProfileData {
  fullname: string;
  email: string;
  phonenumber: string;
  uaddress: string;
  upassword: string;
  myfile?: File | null;
}

const ProfileForm: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullname: "",
    email: "",
    phonenumber: "",
    uaddress: "",
    upassword: "",
    myfile: null,
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    "/asset/image/udi.png"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch profile data from API on component mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            fullname: data.fullname || "",
            email: data.email || "",
            phonenumber: data.phonenumber || "",
            uaddress: data.uaddress || "",
            upassword: "", // Password typically not returned for security reasons
            myfile: null,
          });
          // Optionally set image preview if you get image URL from API
          if (data.imageUrl) setImagePreview(data.imageUrl);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }
    fetchProfile();
  }, []);

  // Handle file input change and preview update
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileData((prev) => ({ ...prev, myfile: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Basic client-side validation example (expand as needed)
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!profileData.fullname.trim())
      newErrors.fullname = "Full Name is required";
    if (!profileData.phonenumber.trim())
      newErrors.phonenumber = "Phone Number is required";
    if (!profileData.uaddress.trim())
      newErrors.uaddress = "Address is required";
    if (!profileData.upassword.trim())
      newErrors.upassword = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", profileData.fullname);
    formDataToSend.append("phonenumber", profileData.phonenumber);
    formDataToSend.append("uaddress", profileData.uaddress);
    formDataToSend.append("upassword", profileData.upassword);
    if (profileData.myfile) {
      formDataToSend.append("myfile", profileData.myfile);
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert("An error occurred while submitting the form.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      noValidate
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <div>
        <img
          id="preview"
          src={imagePreview}
          alt="Profile"
          className="profile-pic"
          style={{ width: "150px", borderRadius: "50%" }}
        />
        <br />
        <input
          type="file"
          name="myfile"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Full Name:</label>
        <br />
        <input
          type="text"
          id="pmfullName"
          name="fullname"
          value={profileData.fullname}
          onChange={handleChange}
        />
        {errors.fullname && (
          <div style={{ color: "red" }}>{errors.fullname}</div>
        )}
      </div>

      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          id="pmemail"
          name="email"
          value={profileData.email}
          disabled
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          id="pmphone"
          name="phonenumber"
          value={profileData.phonenumber}
          onChange={handleChange}
        />
        {errors.phonenumber && (
          <div style={{ color: "red" }}>{errors.phonenumber}</div>
        )}
      </div>

      <div>
        <label>Address:</label>
        <br />
        <input
          type="text"
          id="pmaddress"
          name="uaddress"
          value={profileData.uaddress}
          onChange={handleChange}
        />
        {errors.uaddress && (
          <div style={{ color: "red" }}>{errors.uaddress}</div>
        )}
      </div>

      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="pmpassword"
          name="upassword"
          value={profileData.upassword}
          onChange={handleChange}
        />
        {errors.upassword && (
          <div style={{ color: "red" }}>{errors.upassword}</div>
        )}
      </div>

      <div>
        <input type="submit" id="pmsubmit" value="Submit" />
      </div>
    </form>
  );
};

export default ProfileForm;
