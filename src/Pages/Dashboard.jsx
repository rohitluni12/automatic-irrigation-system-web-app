import React, { useState, useEffect } from "react";

const Index = () => {
  const [NoteNumber, setNoteNumber] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
 
  return (
    <section>
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <h1>Home Page</h1>
      </div>
    </section>
  );
};

export default Index;
