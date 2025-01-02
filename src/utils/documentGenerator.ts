import { createReport } from 'docx-templates';

interface DocumentData {
  clientData: {
    fullName: string;
    cpf: string;
    rg: string;
    maritalStatus: string;
    profession: string;
    nationality: string;
    address: string;
    zipCode: string;
    city: string;
    state: string;
    phone1: string;
    phone2?: string;
    birthDate: string;
    referenceName?: string;
    referencePhone?: string;
  };
  sellingCar: {
    brand: string;
    model: string;
    manufacturingYear: string;
    modelYear: string;
    plate: string;
    color: string;
    chassis: string;
    renavam: string;
    originCity: string;
    price: string;
  };
  tradeCar?: {
    brand: string;
    model: string;
    manufacturingYear: string;
    modelYear: string;
    plate: string;
    color: string;
    chassis: string;
    renavam: string;
    originCity: string;
    price: string;
  };
}

export async function generateDocument(
  template: ArrayBuffer,
  data: DocumentData,
  documentType: 'contract' | 'salePower' | 'purchasePower' | 'residencyDeclaration'
): Promise<ArrayBuffer> {
  try {
    const buffer = await createReport({
      template,
      data: {
        ...data,
        currentDate: new Date().toLocaleDateString('pt-BR'),
      },
    });

    return buffer;
  } catch (error) {
    console.error('Erro ao gerar documento:', error);
    throw error;
  }
}