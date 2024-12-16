/**
 * 日付をフォーマットする関数
 *
 * @param date
 * @returns "yyyy.MM.dd"形式の日付文字列
 */
export function formatDate(date: string): string {
    return date.replace(/-/g, ".");
}

/**
 * 時間をフォーマットする関数
 *
 * @param time
 * @returns "hh:mm"形式の時間文字列
 */
export function formatTime(time: string): string {
    return time.slice(0, 5);
}
