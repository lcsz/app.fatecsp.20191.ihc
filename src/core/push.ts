import https from 'https';


const apiUrl = 'https://onesignal.com/api/v1/notifications';
const apiId = ''


export class PushService {
    private async dispatch(method: string, path: string, data?: any) {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'
        };
        const options = {
            host: 'onesignal.com',
            port: 443,
            path: path,
            method: method,
            headers: headers
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                res.on('data', data => {
                    resolve(JSON.parse(data));
                });
            });
            if (data !== undefined) {
                req.write(data);
            }
            req.on('error', reject);
            req.end();
        });
    }

    protected async createNotification(segments: string[], template: string) {
        const data = {
            app_id: apiId,
            template_id: template,
            included_segments: segments
        };
        return this.dispatch('POST', '/api/v1/notifications', data);
    }

    async notifyBooking() {
        return this.createNotification(
            ['Staff - ADM'],
            'New Booking'
        );
    }
}
