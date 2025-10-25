/**
 * Challenge 4: Punchcard Riddle
 * Solution display for the punchcard decoding challenge
 */

import './challenge4.css';

export default function Challenge4() {
  const cardData = [
    { seq: 0, char: 'T', file: 'AHS3jfd.txt' },
    { seq: 1, char: 'h', file: 'EJR&FS.txt' },
    { seq: 2, char: 'e', file: 'ID83hT.txt' },
    { seq: 3, char: 'r', file: 'IHF83KT.txt' },
    { seq: 4, char: 'e', file: 'INTAH23.txt' },
    { seq: 5, char: "'", file: 'OijhUEN7.txt' },
    { seq: 6, char: 's', file: 'S8yreh3.txt' },
    { seq: 7, char: ' ', file: 'Ienuth3K.txt' },
    { seq: 8, char: 'n', file: 'ise843gt.txt' },
    { seq: 9, char: 'o', file: 'iwhe7234l.txt' },
    { seq: 10, char: ' ', file: 'sd92j342.txt' },
    { seq: 11, char: 'p', file: 'asdk823j.txt' },
    { seq: 12, char: 'l', file: 'JSUf823KR.txt' },
    { seq: 13, char: 'a', file: 'OWEU23F.txt' },
    { seq: 14, char: 'c', file: 'SDU213uf.txt' },
    { seq: 15, char: 'e', file: 'AUWEh24.txt' },
    { seq: 16, char: ' ', file: 'ASDUwe9.txt' },
    { seq: 17, char: 'l', file: 'asdi823re.txt' },
    { seq: 18, char: 'i', file: 'ASDUwe8wr.txt' },
    { seq: 19, char: 'k', file: 'POwer84.txt' },
    { seq: 20, char: 'e', file: 'RWrifR4.txt' },
    { seq: 21, char: ' ', file: 'IWEjur54.txt' },
    { seq: 22, char: 'h', file: 'SDFUEt43.txt' },
    { seq: 23, char: 'o', file: 'IETUS34.txt' },
    { seq: 24, char: 'm', file: 'wer834T.txt' },
    { seq: 25, char: 'e', file: '1238TERs.txt' },
  ];

  const message = cardData.map(card => card.char).join('');

  return (
    <div className="challenge4-container">
      <div className="challenge4-header">
        <h1>Challenge #4 - Punchcard Riddle</h1>
        <div className="challenge4-badge">SOLVED</div>
      </div>

      <section className="solution-section">
        <h2>Answer</h2>
        <div className="answer-box">
          <p className="answer-text">"{message}"</p>
          <p className="answer-attribution">— Dorothy, <em>The Wizard of Oz</em></p>
        </div>
      </section>

      <section className="solution-section">
        <h2>Technical Walkthrough</h2>

        <div className="step">
          <h3>Step 1: Analyzed the Punchcard Files</h3>
          <p>
            Downloaded and examined 27 text files from Google Drive. Each file contained:
          </p>
          <ul>
            <li><strong>Line 1:</strong> 8-bit binary number (sequence number 0-25)</li>
            <li><strong>Line 2:</strong> 8-bit binary number (ASCII character code)</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 2: Decoded Binary to ASCII</h3>
          <p>Each punchcard's second line represented an ASCII character:</p>
          <pre className="code-block">
{`char = chr(int(binary_string, 2))`}
          </pre>
          <p>Example:</p>
          <ul>
            <li><code>01101000</code> → 104 (decimal) → 'h'</li>
            <li><code>01100101</code> → 101 (decimal) → 'e'</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 3: Determined Card Ordering</h3>
          <p>
            The <strong>first line</strong> in each file was the sequence number (0-25),
            not the filename or timestamp!
          </p>

          <div className="card-table-container">
            <table className="card-table">
              <thead>
                <tr>
                  <th>Sequence</th>
                  <th>Character</th>
                  <th>Filename</th>
                </tr>
              </thead>
              <tbody>
                {cardData.map((card) => (
                  <tr key={card.seq}>
                    <td>{card.seq}</td>
                    <td className="char-cell">
                      {card.char === ' ' ? '(space)' : card.char}
                    </td>
                    <td className="file-cell">{card.file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="step">
          <h3>Step 4: Assembled the Message</h3>
          <p>Concatenated all characters in sequence order to reveal:</p>
          <div className="final-message">
            <code>{message}</code>
          </div>
        </div>
      </section>

      <section className="solution-section">
        <h2>Solution Code</h2>
        <pre className="code-block">
{`import glob

# Read all punchcard files
cards = []
for filepath in glob.glob('/tmp/drive-download/*.txt'):
    with open(filepath, 'r') as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]

    if len(lines) >= 2:
        sequence = int(lines[0], 2)  # First line = sequence number
        char = chr(int(lines[1], 2))  # Second line = character
        cards.append((sequence, char))

# Sort by sequence number and build message
cards.sort(key=lambda x: x[0])
message = ''.join([char for _, char in cards])

print(message)  # Output: "There's no place like home"`}
        </pre>
      </section>

      <section className="solution-section stats">
        <h2>Challenge Details</h2>
        <ul>
          <li><strong>Source:</strong> Google Drive folder with 27 punchcard files</li>
          <li><strong>Format:</strong> Each file contained two 8-bit binary strings</li>
          <li><strong>Encoding:</strong> First line = sequence index, Second line = ASCII character</li>
          <li><strong>Time to solve:</strong> ~3 minutes</li>
          <li><strong>Key insight:</strong> The sequence number was embedded in the data, not the filename or timestamp</li>
        </ul>
      </section>
    </div>
  );
}
