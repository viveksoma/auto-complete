import { useState, useEffect, useRef, useCallback } from "react";

interface AutoCompleteProps {
  dataFetcher: (query: string) => Promise<string[]>; // Async function to fetch suggestions
}

export default function AutoComplete({ dataFetcher }: AutoCompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useCallback to memoize the function and avoid unnecessary re-creations
  const fetchSuggestions = useCallback(async () => {
    if (query.length > 0) {
      const results = await dataFetcher(query);
      setSuggestions(results);
      setDropdownVisible(results.length > 0);
    } else {
      setSuggestions([]);
      setDropdownVisible(false);
    }
  }, [query, dataFetcher]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        if (highlightIndex >= 0) {
          setQuery(suggestions[highlightIndex]);
          setDropdownVisible(false);
        }
        break;
      case "Escape":
        setDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (selected: string) => {
    setQuery(selected);
    setDropdownVisible(false);
  };

  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setDropdownVisible(suggestions.length > 0)}
        placeholder="Type to search..."
      />
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={highlightIndex === index ? "highlighted" : ""}
              onMouseDown={() => handleSelect(item)}
            >
              {highlightMatch(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
