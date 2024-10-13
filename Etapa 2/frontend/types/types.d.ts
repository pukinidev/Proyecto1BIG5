interface PredictionInterface {
  "3": number;
  "4": number;
  "5": number;
  Texto: string;
  Prediccion: string;
}

interface ModelContainerProps {
  data: PredictionInterface[] | null;
}

interface ModelDetailsProps {
  data: PredictionInterface | null;
}

interface SendDataInterface {
  Textos_espanol: string;
}

interface ModelModalProps {
  open: boolean;
  handleClose: () => void;
  data: SendDataInterface[] | null;
}

interface ModelTableProps {
  data: SendDataInterface[] | null;
}

interface ModelMetricsInterface {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}
