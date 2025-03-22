import PQueue from 'p-queue';

type QueueTask<T> = () => Promise<T>;

export class Queue {
  private static instance: Queue;
  private readonly queue: PQueue;

  private constructor(concurrency: number = 1) {
    this.queue = new PQueue({ concurrency });
  }

  static getInstance(concurrency: number = 1): Queue {
    if (!Queue.instance) {
      Queue.instance = new Queue(concurrency);
    }
    return Queue.instance;
  }

  async addTask<T>(task: QueueTask<T>): Promise<T> {
    return this.queue.add(task) as Promise<T>;
  }
}
