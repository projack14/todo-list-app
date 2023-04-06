import React, { useState, useEffect } from "react";
import { FC } from "react";

export const Spinner: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "#F3F3F3",
              marginRight: "1rem",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "#F3F3F3",
              marginRight: "1rem",
              animation: "spin 1s linear infinite",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "#F3F3F3",
              animation: "spin 1s linear infinite",
              animationDelay: "0.4s",
            }}
          ></div>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
            Content loaded!
          </h1>
        </div>
      )}
    </div>
  );
};
