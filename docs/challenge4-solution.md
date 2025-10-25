# Challenge #4 - Punchcard Riddle

## Answer

**"There's no place like home"**

This is the famous quote from Dorothy in *The Wizard of Oz*.

---

## Technical Walkthrough

### Step 1: Analyzed the Punchcard Files

Downloaded and examined 27 text files from the Google Drive folder. Each file contained:
- **Line 1:** 8-bit binary number (sequence number 0-25)
- **Line 2:** 8-bit binary number (ASCII character code)

### Step 2: Decoded Binary to ASCII

Each punchcard's second line represented an ASCII character:
```python
char = chr(int(binary_string, 2))
```

Example:
- `01101000` → 104 (decimal) → 'h'
- `01100101` → 101 (decimal) → 'e'

### Step 3: Determined Card Ordering

The **first line** in each file was the sequence number (0-25), not the filename or timestamp!

Sorted all 26 cards by their sequence number:

| Sequence | Character | Filename |
|----------|-----------|----------|
| 0 | T | AHS3jfd.txt |
| 1 | h | EJR&FS.txt |
| 2 | e | ID83hT.txt |
| 3 | r | IHF83KT.txt |
| 4 | e | INTAH23.txt |
| 5 | ' | OijhUEN7.txt |
| 6 | s | S8yreh3.txt |
| 7 | (space) | Ienuth3K.txt |
| 8 | n | ise843gt.txt |
| 9 | o | iwhe7234l.txt |
| 10 | (space) | sd92j342.txt |
| 11 | p | asdk823j.txt |
| 12 | l | JSUf823KR.txt |
| 13 | a | OWEU23F.txt |
| 14 | c | SDU213uf.txt |
| 15 | e | AUWEh24.txt |
| 16 | (space) | ASDUwe9.txt |
| 17 | l | asdi823re.txt |
| 18 | i | ASDUwe8wr.txt |
| 19 | k | POwer84.txt |
| 20 | e | RWrifR4.txt |
| 21 | (space) | IWEjur54.txt |
| 22 | h | SDFUEt43.txt |
| 23 | o | IETUS34.txt |
| 24 | m | wer834T.txt |
| 25 | e | 1238TERs.txt |

### Step 4: Assembled the Message

Concatenated all characters in sequence order to reveal:

```
There's no place like home
```

---

## Solution Code

```python
import glob

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

print(message)  # Output: "There's no place like home"
```

---

## Challenge Details

- **Source:** Google Drive folder with 27 punchcard files
- **Format:** Each file contained two 8-bit binary strings
- **Encoding:** First line = sequence index, Second line = ASCII character
- **Time to solve:** ~3 minutes
- **Key insight:** The sequence number was embedded in the data, not the filename or timestamp

---

**Final Answer:** "There's no place like home"
