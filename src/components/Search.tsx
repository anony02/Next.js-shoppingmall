/** @jsxImportSource @emotion/react */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { searchInputState, searchDropdownState } from '../recoil/atoms';
import { fetchProducts } from '../utils/api';
import {
  searchbox,
  searchboxActive,
  searchicon,
  searchinput,
  dropdownStyle,
  highlightText,
} from '../styles/searchStyles';

interface Product {
  id: number;
  title: string;
  [key: string]: any;
}

export default function Search(): React.ReactElement {
  const [input, setInput] = useRecoilState(searchInputState);
  const [dropdown, setDropdown] = useRecoilState(searchDropdownState);
  const [idx, setIdx] = useState<number>(-1);

  const router = useRouter();

  const { data: list = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const title = list.map((x) => x.title);
  const id = list.map((x) => x.id);
  const findid = (x: string) => id[title.indexOf(x)];

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const onkeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (dropdown.length === 0) return;
    if (e.key === 'ArrowDown' && dropdown.length > idx + 1) {
      setIdx(idx + 1);
    } else if (e.key === 'ArrowUp' && idx >= 0) {
      setIdx(idx - 1);
    } else if (e.key === 'Enter' && idx >= 0) {
      router.push(`/detail/${findid(dropdown[idx])}`);
      setDropdown([]);
      setIdx(-1);
    }
  };

  const onClick = (el: string) => {
    router.push(`/detail/${findid(el)}`);
    setDropdown([]);
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} css={highlightText}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  useEffect(() => {
    if (input === '') {
      setDropdown([]);
    } else {
      const inputToLower = input.toLowerCase();
      setDropdown(
        title
          .filter((el) => el.toLowerCase().includes(inputToLower))
          .sort((a, b) => a.toLowerCase().indexOf(inputToLower) - b.toLowerCase().indexOf(inputToLower)),
      );
    }
  }, [input]);

  useEffect(() => {
    setDropdown([]);
  }, [router]);

  return (
    <div css={dropdown.length > 0 ? searchboxActive : searchbox}>
      <svg css={searchicon} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
      </svg>
      <input css={searchinput} placeholder="상품 검색" value={input} onChange={onchange} onKeyUp={onkeyup} />
      {dropdown.length > 0 && (
        <div css={dropdownStyle}>
          {dropdown.map((el, i) => (
            <div
              key={i}
              onMouseOver={() => setIdx(i)}
              onClick={() => onClick(el)}
              style={{ backgroundColor: i === idx ? 'lightgray' : 'white' }}
            >
              {highlightMatch(el, input)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
