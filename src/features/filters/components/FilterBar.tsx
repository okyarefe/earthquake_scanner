import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFiltersStore } from '../store';
import type { TimeWindow } from '../store';

const timeWindows: TimeWindow[] = ['hour', 'day', 'week'];
const timeWindowLabels: Record<TimeWindow, string> = {
  hour: 'Past hour',
  day: 'Past day',
  week: 'Past week',
  month: 'Past month',
};

const FilterBar = () => {
  const minMagnitude = useFiltersStore((state) => state.minMagnitude);
  const setMinMagnitude = useFiltersStore((state) => state.setMinMagnitude);
  const timeWindow = useFiltersStore((state) => state.timeWindow);
  const setTimeWindow = useFiltersStore((state) => state.setTimeWindow);

  return (
    <Card className="w-full max-w-sm text-left">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label id="min-magnitude-label">Minimum magnitude</Label>
            <span className="text-sm tabular-nums text-muted-foreground">
              {minMagnitude.toFixed(1)}
            </span>
          </div>
          <Slider
            aria-labelledby="min-magnitude-label"
            min={0}
            max={10}
            step={0.5}
            value={[minMagnitude]}
            onValueChange={(value) =>
              setMinMagnitude(Array.isArray(value) ? value[0] : value)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="time-window">Time window</Label>
          <Select
            value={timeWindow}
            onValueChange={(value) => setTimeWindow(value as TimeWindow)}
          >
            <SelectTrigger id="time-window" className="w-full">
              <SelectValue>
                {(value) => timeWindowLabels[value as TimeWindow]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeWindows.map((window) => (
                <SelectItem key={window} value={window}>
                  {timeWindowLabels[window]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
