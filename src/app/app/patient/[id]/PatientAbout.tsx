type Props = {
  title: string;
  value: string | undefined;
};

const PatientAbout: React.FC<Props> = ({ title, value }: Props) => {
  if (!value) return null;
  return (
    <div className="w-auto flex-col flex">
      <p className="text-xs text-muted-foreground">{title}</p>
      <h3 className="text-sm font-medium">{value}</h3>
    </div>
  );
};

export default PatientAbout;
