export const metadata = {
    title: "المرضى",
    description: "Patients next app",
  };
  
  export default function Patientslayout({ children }) {
    return (
      <div className="h-screen overflow-auto">{children}</div>
    );
  }
  