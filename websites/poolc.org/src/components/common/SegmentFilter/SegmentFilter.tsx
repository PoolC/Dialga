import styled from '@emotion/styled';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { media } from '~/styles/responsive';

type SegmentFilterOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentFilterProps<T extends string> = {
  value: T;
  options: SegmentFilterOption<T>[];
  onChange: (value: T) => void;
};

export function SegmentFilter<T extends string>({ value, options, onChange }: SegmentFilterProps<T>) {
  return (
    <SegmentFilterRoot>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) {
            onChange(nextValue as T);
          }
        }}
        variant="outline"
        spacing={0}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </SegmentFilterRoot>
  );
}

const SegmentFilterRoot = styled.div`
  [data-slot='toggle-group'] {
    display: flex;
    width: fit-content;
    overflow: hidden;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    background: #ffffff;
  }

  [data-slot='toggle-group-item'] {
    min-width: 56px;
    height: 40px;
    padding: 0 14px;
    border-radius: 0;
    color: #5c5145;
    font-size: 14px;
    font-weight: 700;
    line-height: 40px;
  }

  [data-slot='toggle-group-item'] + [data-slot='toggle-group-item'] {
    border-left: 1px solid #d8d0c3;
  }

  [data-slot='toggle-group-item'][data-state='on'] {
    background: #f1fbf8;
    color: #007a66;
  }

  ${media.compact} {
    [data-slot='toggle-group'] {
      width: 100%;
    }

    [data-slot='toggle-group-item'] {
      flex: 1;
    }
  }
`;
