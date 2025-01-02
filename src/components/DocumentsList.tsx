import React from 'react';

interface DocumentsListProps {
  hasTradeCar: boolean;
  needsResidencyDeclaration: boolean;
  setNeedsResidencyDeclaration: (value: boolean) => void;
}

export function DocumentsList({
  hasTradeCar,
  needsResidencyDeclaration,
  setNeedsResidencyDeclaration,
}: DocumentsListProps) {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Documentos a Gerar</h2>
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Serão gerados automaticamente:
        </div>
        <ul className="list-disc ml-5">
          <li>Contrato de Compra e Venda</li>
          <li>Procuração para Compra</li>
          {hasTradeCar && <li>Procuração para Venda</li>}
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="needsResidencyDeclaration"
            checked={needsResidencyDeclaration}
            onChange={(e) => setNeedsResidencyDeclaration(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="needsResidencyDeclaration" className="ml-2 block text-sm text-gray-900">
            Incluir Declaração de Residência
          </label>
        </div>
      </div>
    </section>
  );
}