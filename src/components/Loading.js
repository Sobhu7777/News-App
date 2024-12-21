import React from "react";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status" style={{width:'4rem',height:'4rem'}}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
