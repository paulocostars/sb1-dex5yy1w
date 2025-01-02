import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { ClientForm } from './components/ClientForm';
import { CarForm } from './components/CarForm';
import { DocumentsList } from './components/DocumentsList';
import { generateDocument } from './utils/documentGenerator';

function App() {
  const [hasTradeCar, setHasTradeCar] = useState(false);
  const [hasReference, setHasReference] = useState(false);
  const [needsResidencyDeclaration, setNeedsResidencyDeclaration] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const clientData = {
      fullName: formData.get('fullName') as string,
      cpf: formData.get('cpf') as string,
      rg: formData.get('rg') as string,
      maritalStatus: formData.get('maritalStatus') as string,
      profession: formData.get('profession') as string,
      nationality: formData.get('nationality') as string,
      address: formData.get('address') as string,
      zipCode: formData.get('zipCode') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      phone1: formData.get('phone1') as string,
      phone2: formData.get('phone2') as string,
      birthDate: formData.get('birthDate') as string,
      referenceName: hasReference ? formData.get('referenceName') as string : undefined,
      referencePhone: hasReference ? formData.get('referencePhone') as string : undefined,
    };

    const sellingCar = {
      brand: formData.get('sellingCarBrand') as string,
      model: formData.get('sellingCarModel') as string,
      manufacturingYear: formData.get('sellingCarManufacturingYear') as string,
      modelYear: formData.get('sellingCarModelYear') as string,
      plate: formData.get('sellingCarPlate') as string,
      color: formData.get('sellingCarColor') as string,
      chassis: formData.get('sellingCarChassis') as string,
      renavam: formData.get('sellingCarRenavam') as string,
      originCity: formData.get('sellingCarOriginCity') as string,
      price: formData.get('sellingCarPrice') as string,
    };

    let tradeCar;
    if (hasTradeCar) {
      tradeCar = {
        brand: formData.get('tradeCarBrand') as string,
        model: formData.get('tradeCarModel') as string,
        manufacturingYear: formData.get('tradeCarManufacturingYear') as string,
        modelYear: formData.get('tradeCarModelYear') as string,
        plate: formData.get('tradeCarPlate') as string,
        color: formData.get('tradeCarColor') as string,
        chassis: formData.get('tradeCarChassis') as string,
        renavam: formData.get('tradeCarRenavam') as string,
        originCity: formData.get('tradeCarOriginCity') as string,
        price: formData.get('tradeCarPrice') as string,
      };
    }

    const documentData = {
      clientData,
      sellingCar,
      tradeCar,
    };

    try {
      // Gerar Contrato de Compra e Venda
      const contractTemplate = await fetch('/templates/contract.docx').then(res => res.arrayBuffer());
      const contract = await generateDocument(contractTemplate, documentData, 'contract');
      
      // Gerar Procuração de Compra
      const purchasePowerTemplate = await fetch('/templates/purchase-power.docx').then(res => res.arrayBuffer());
      const purchasePower = await generateDocument(purchasePowerTemplate, documentData, 'purchasePower');

      // Se houver carro na troca, gerar Procuração de Venda
      if (hasTradeCar) {
        const salePowerTemplate = await fetch('/templates/sale-power.docx').then(res => res.arrayBuffer());
        await generateDocument(salePowerTemplate, documentData, 'salePower');
      }

      // Se necessário, gerar Declaração de Residência
      if (needsResidencyDeclaration) {
        const residencyTemplate = await fetch('/templates/residency.docx').then(res => res.arrayBuffer());
        await generateDocument(residencyTemplate, documentData, 'residencyDeclaration');
      }

      // Aqui você pode adicionar a lógica para download dos documentos gerados
    } catch (error) {
      console.error('Erro ao gerar documentos:', error);
      alert('Erro ao gerar documentos. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <FileText className="w-8 h-8" />
          Formulário de Venda de Veículos
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ClientForm hasReference={hasReference} setHasReference={setHasReference} />
          <CarForm title="Dados do Veículo em Venda" prefix="sellingCar" />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasTradeCar"
              checked={hasTradeCar}
              onChange={(e) => setHasTradeCar(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasTradeCar" className="ml-2 block text-sm text-gray-900">
              Incluir veículo na troca
            </label>
          </div>

          {hasTradeCar && <CarForm title="Dados do Veículo na Troca" prefix="tradeCar" />}

          <DocumentsList
            hasTradeCar={hasTradeCar}
            needsResidencyDeclaration={needsResidencyDeclaration}
            setNeedsResidencyDeclaration={setNeedsResidencyDeclaration}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Gerar Documentos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;