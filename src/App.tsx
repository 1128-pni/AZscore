import { type FC } from 'react';
import { GestationalAgeInput } from './components/GestationalAgeInput';
import { MeasurementTable } from './components/MeasurementTable';
import { DopplerMeasurementTable } from './components/DopplerMeasurementTable';
import Header from './components/Header';
import { Layout } from './components/Layout';
import { useCalculator } from './hooks/useCalculator';
import { GestationalAge } from './types/calculator';

const App: FC = () => {
  const {
    formData: normalFormData,
    handleGestationalAgeChange: handleNormalGAChange,
    handleMeasurementChange: handleNormalMeasurementChange,
    handleAddMeasurement: handleNormalAddMeasurement,
  } = useCalculator(false);

  const {
    formData: dopplerFormData,
    handleGestationalAgeChange: handleDopplerGAChange,
    handleMeasurementChange: handleDopplerMeasurementChange,
    handleAddMeasurement: handleDopplerAddMeasurement,
  } = useCalculator(true);

  const handleGAChange = (newAge: GestationalAge) => {
    console.log('Updating gestational age for both calculators:', newAge);
    handleNormalGAChange(newAge);
    handleDopplerGAChange(newAge);
  };

  return (
    <Layout>
      <div className="fade-in bg-gradient-to-b from-blue-50/50 to-transparent pb-8">
        <Header />
      </div>
      
      <main className="container mx-auto px-4 -mt-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <section 
            className="slide-up apple-card p-8 relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r 
                       before:from-blue-500/5 before:to-purple-500/5 before:opacity-40"
          >
            <GestationalAgeInput
              value={normalFormData.gestationalAge}
              onChange={handleGAChange}
            />
          </section>
          
          <section 
            className="slide-up apple-card p-8 relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r 
                       before:from-emerald-500/5 before:to-blue-500/5 before:opacity-40"
          >
            <MeasurementTable
              measurements={normalFormData.measurements}
              onMeasurementChange={handleNormalMeasurementChange}
              onAddMeasurement={handleNormalAddMeasurement}
            />
          </section>

          <section 
            className="slide-up apple-card p-8 relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r 
                       before:from-pink-500/5 before:to-purple-500/5 before:opacity-40"
          >
            <DopplerMeasurementTable
              measurements={dopplerFormData.measurements}
              onMeasurementChange={handleDopplerMeasurementChange}
              onAddMeasurement={handleDopplerAddMeasurement}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default App;