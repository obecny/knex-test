const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
const { AsyncLocalStorageContextManager } = require('@opentelemetry/context-async-hooks');
const { trace } = require('@opentelemetry/api');

const provider = new NodeTracerProvider({});
const exporter = new CollectorTraceExporter({ serviceName: 'knex-test', });

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  // contextManager: new AsyncLocalStorageContextManager(),
});

trace.setGlobalTracerProvider(provider);