export const metadata = {
    title: "Patients",
    description: "Patients next app",
  };
  
  export default function Patientslayout({ children }) {
    return (
      <div className="h-screen overflow-auto">{children}</div>
    );
  }
  