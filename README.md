# Transaction Monitoring Rule Builder

A powerful, drag-and-drop interface for building complex transaction monitoring rules for financial compliance and fraud detection.

![Transaction Monitoring Rule Builder](https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Visual Rule Builder**: Drag-and-drop interface for creating complex monitoring rules
- **Multiple Data Sources**: Support for Customer, Account, and Transaction datasets
- **Advanced Operators**: Rich set of operators including:
  - Filtering conditions
  - Mathematical operations
  - Date functions
  - Logical operators
  - Aggregation functions
  - Threshold settings
- **Real-time Preview**: Live rule expression preview
- **Testing Framework**: Built-in testing capabilities with sample data
- **Segment Management**: Customer segment-specific rule configuration
- **Risk Scoring**: Configurable risk scoring categories (High, Medium, Low)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- DND Kit (Drag and Drop)
- Lucide React (Icons)
- Vite (Build Tool)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/transaction-monitoring-rule-builder.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. **Select Dataset**: Choose from Customer, Account, or Transaction datasets
2. **Build Rules**: 
   - Drag attributes from the left panel
   - Add operators to create conditions
   - Configure thresholds and parameters
3. **Set Segments**: Select customer segments and risk scoring
4. **Test Rules**: Use the testing panel to validate rules with sample data
5. **Review Results**: Analyze test results including hit rates and alerts

## Project Structure

```
src/
├── components/         # React components
│   ├── LeftPanel/     # Dataset and operator selection
│   ├── MiddlePanel/   # Rule building canvas
│   └── RightPanel/    # Preview and testing
├── hooks/             # Custom React hooks
├── store/             # Zustand store
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [DND Kit](https://dndkit.com/) for the drag and drop functionality
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
