import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchBusinessServices } from "./useFetchBusinessServices";
import {
  BusinessService,
  BusinessServicePage,
  PageRepresentation,
} from "api/models";
import { BUSINESS_SERVICES } from "api/rest";

describe("useFetchBusinessServices", () => {
  it("Fetch error due to no REST API found", async () => {
    // Mock REST API
    new MockAdapter(axios).onGet(BUSINESS_SERVICES).networkError();

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBusinessServices()
    );

    const {
      businessServices,
      isFetching,
      fetchError,
      fetchBusinessServices,
    } = result.current;

    expect(isFetching).toBe(false);
    expect(businessServices).toBeUndefined();
    expect(fetchError).toBeUndefined();

    // Init fetch
    act(() => fetchBusinessServices({}, { page: 2, perPage: 50 }));
    expect(result.current.isFetching).toBe(true);

    // Fetch finished
    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.businessServices).toBeUndefined();
    expect(result.current.fetchError).not.toBeUndefined();
  });

  it("Fetch success", async () => {
    // Mock REST API
    const data: BusinessServicePage = {
      _embedded: {
        "business-service": [],
      },
      total_count: 0,
    };

    new MockAdapter(axios)
      .onGet(`${BUSINESS_SERVICES}?page=0&size=10&name=something`)
      .reply(200, data);

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBusinessServices()
    );

    const {
      businessServices,
      isFetching,
      fetchError,
      fetchBusinessServices,
    } = result.current;

    expect(isFetching).toBe(false);
    expect(businessServices).toBeUndefined();
    expect(fetchError).toBeUndefined();

    // Init fetch
    act(() =>
      fetchBusinessServices({ name: ["something"] }, { page: 1, perPage: 10 })
    );
    expect(result.current.isFetching).toBe(true);

    // Fetch finished
    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.businessServices).toMatchObject({
      data: [],
      meta: { count: 0 },
    });
    expect(result.current.fetchError).toBeUndefined();
  });
});