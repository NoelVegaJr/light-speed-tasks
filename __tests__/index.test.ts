
import dateFormatter, {sum} from '@/utils/dateFormatter';

test('adds 1 + 1 to equal 2', () => {
  expect(sum(1,1)).toBe(2);
});


test('time diff < 60 sec to equal "59 seconds ago"', () => {
  expect(dateFormatter(1675422265150, 1675422324150)).toBe("59 seconds ago");
})

test('time diff < 60 min to equal "59 minutes ago"', () => {
  expect(dateFormatter(1675422265150, 1675425805150)).toBe("59 minutes ago");
})

test('time diff < 24 hours to equal "23 hours ago"', () => {
  expect(dateFormatter(1675422265150, 1675507225150)).toBe("23 hours ago");
})

test('time diff >= 24 hours to equal "1 day ago"', () => {
  expect(dateFormatter(1675422265150, 1675508665150)).toBe("1 day ago");
})

test('time diff > 48 hours to equal "2 days ago"', () => {
  expect(dateFormatter(1675422265150, 1675595065150)).toBe("2 days ago");
})
