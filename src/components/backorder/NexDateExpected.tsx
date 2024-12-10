// app/components/ClientB.tsx (Client Component)
'use client';

type ClientBProps = {
  state: string;
};

export const ClientB = ({ state }: ClientBProps) => {
  return (
    <div>
      <h2>Componente B</h2>
      <p>El estado recibido es: {state}</p>
    </div>
  );
};