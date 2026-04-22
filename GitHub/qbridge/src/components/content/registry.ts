import React from 'react';

// Mathematics
import VectorsLesson from './mathematics/VectorsLesson';
import MatricesLesson from './mathematics/MatricesLesson';
import ComplexNumbersLesson from './mathematics/ComplexNumbersLesson';
import PlanarRelationshipsLesson from './mathematics/PlanarRelationshipsLesson';
import TensorProductsLesson from './mathematics/TensorProductsLesson';

// Programming
import PythonModulesLesson from './programming/PythonModulesLesson';
import BitsGatesLesson from './programming/BitsGatesLesson';
import AlgorithmsLesson from './programming/AlgorithmsLesson';
import BigOLesson from './programming/BigOLesson';

// Physics
import WaveParticleDualityLesson from './physics/WaveParticleDualityLesson';
import DoubleSlitLesson from './physics/DoubleSlitLesson';
import MeasurementDecoherenceLesson from './physics/MeasurementDecoherenceLesson';
import QuantumEntanglementLesson from './physics/QuantumEntanglementLesson';

// Quantum Computing
import QubitsLesson from './quantum-computing/QubitsLesson';
import BlochSphereLesson from './quantum-computing/BlochSphereLesson';
import QuantumGatesLesson from './quantum-computing/QuantumGatesLesson';
import ReversibilityLesson from './quantum-computing/ReversibilityLesson';
import ShorsAlgorithmLesson from './quantum-computing/ShorsAlgorithmLesson';
import GroversAlgorithmLesson from './quantum-computing/GroversAlgorithmLesson';
import MultiQubit1Lesson from './quantum-computing/MultiQubit1Lesson';
import MultiQubit2Lesson from './quantum-computing/MultiQubit2Lesson';

import ReferenceLesson from './ReferenceLesson';

export const lessonRegistry: Record<string, React.ComponentType<any>> = {
    // Mathematics
    'vectors': VectorsLesson,
    'matrices': MatricesLesson,
    'complex-numbers': ComplexNumbersLesson,
    'planar-relationships': PlanarRelationshipsLesson,
    'tensor-products': TensorProductsLesson,

    // Programming
    'python-and-modules': PythonModulesLesson,
    'bits-and-gates': BitsGatesLesson,
    'algorithms': AlgorithmsLesson,
    'big-o-and-efficiency': BigOLesson,

    // Physics
    'wave-particle-duality': WaveParticleDualityLesson,
    'double-slit': DoubleSlitLesson,
    'measurement-and-decoherence': MeasurementDecoherenceLesson,
    'quantum-entanglement': QuantumEntanglementLesson,

    // Quantum Computing
    'qubits': QubitsLesson,
    'bloch-sphere': BlochSphereLesson,
    'quantum-gates': QuantumGatesLesson,
    'reversibility': ReversibilityLesson,
    'shors-alg': ShorsAlgorithmLesson,
    'grovers-alg': GroversAlgorithmLesson,
    'multi-qubit-1': MultiQubit1Lesson,
    'multi-qubit-2': MultiQubit2Lesson,

    // Fallback
    'reference-lesson': ReferenceLesson,
};
