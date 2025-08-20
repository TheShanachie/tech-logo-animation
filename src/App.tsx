import './App.css'
import RetroChipComponent from './components/retro-chip-component'

function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      border: '2px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: '#666'
    }}>
      <RetroChipComponent
        text="AI"
        containerMode="fill"
        showStripes={true}
        enableAnimation={true}
      />
    </div>
  )
}

export default App
