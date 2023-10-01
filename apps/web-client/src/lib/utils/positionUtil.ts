import { match } from 'ts-pattern';
import { PostCreateRequest } from '~/lib/api-v2';

export function convertPositionToText(position: PostCreateRequest['position']) {
  return match(position) //
    .with('BOOTCAMP', () => '부트캠프')
    .with('COMPETITION', () => '대회')
    .with('NEW_EMPLOYEE', () => '신입')
    .with('EXPERIENCED_EMPLOYEE', () => '경력')
    .with('INTERN_FOR_EXPERIENCE', () => '체험형 인턴')
    .with('INTERN_FOR_JOB', () => '채용형 인턴')
    .with('OTHER', () => '기타')
    .with(undefined, () => '')
    .exhaustive();
}
